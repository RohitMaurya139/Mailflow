import type { Job } from 'bullmq';
import { Campaign, CampaignRecipient, Contact, mongoose } from '@mailflow/db';
import { enqueue, type CampaignFanoutJob } from '@mailflow/queue';
import { QUEUE_NAMES } from '@mailflow/shared';

import { logger } from '../logger';

/**
 * Expand a campaign into per-recipient send jobs:
 *  1. collect active contacts across the campaign's lists,
 *  2. upsert a CampaignRecipient per (campaign, contact) — dedup via the unique
 *     index, so re-runs never double-send,
 *  3. enqueue a staggered, jittered send-email job for each queued recipient
 *     (deterministic jobId → idempotent re-fanout).
 */
export async function processCampaignFanout(job: Job<CampaignFanoutJob>): Promise<void> {
  const { orgId, campaignId } = job.data;
  const log = logger.child({ worker: 'campaign-fanout', campaignId });

  const campaign = await Campaign.findOne({ _id: campaignId, orgId });
  if (!campaign) {
    log.warn('campaign not found');
    return;
  }
  if (campaign.status === 'paused' || campaign.status === 'completed') {
    log.info({ status: campaign.status }, 'skipping fanout');
    return;
  }

  campaign.status = 'running';
  await campaign.save();

  const contacts = await Contact.find({
    orgId,
    listIds: { $in: campaign.listIds },
    status: 'active',
  })
    .select('_id')
    .lean();

  if (contacts.length > 0) {
    await CampaignRecipient.bulkWrite(
      contacts.map((c) => ({
        updateOne: {
          filter: { campaignId: campaign._id, contactId: c._id },
          update: {
            $setOnInsert: {
              orgId: new mongoose.Types.ObjectId(orgId),
              campaignId: campaign._id,
              contactId: c._id,
              status: 'queued' as const,
            },
          },
          upsert: true,
        },
      })),
      { ordered: false },
    );
  }

  const queued = await CampaignRecipient.find({ campaignId: campaign._id, status: 'queued' })
    .select('_id')
    .lean();

  const startAt = campaign.schedule?.startAt?.getTime() ?? Date.now();
  const baseDelay = Math.max(0, startAt - Date.now());

  let i = 0;
  for (const r of queued) {
    const jitter = Math.floor(Math.random() * 5_000);
    const delay = baseDelay + i * 1_500 + jitter; // stagger to avoid bursts
    await enqueue(
      QUEUE_NAMES.sendEmail,
      { orgId, campaignId, recipientId: r._id.toString() },
      { jobId: `send-${r._id.toString()}`, delay },
    );
    i++;
  }

  await Campaign.updateOne({ _id: campaign._id }, { $set: { 'stats.queued': queued.length } });
  log.info({ recipients: queued.length }, 'fanout complete');
}
