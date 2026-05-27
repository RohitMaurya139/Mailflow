import { NextResponse } from 'next/server';
import { CampaignRecipient, connectToDatabase } from '@mailflow/db';
import { enqueue } from '@mailflow/queue';
import { QUEUE_NAMES } from '@mailflow/shared';
import { env } from '@mailflow/shared/env';
import { recordRecipientEvent } from '@/lib/tracking-events';

/** Click-tracking redirect. Records the click then 302s to the original URL. */
export async function GET(req: Request, ctx: { params: Promise<{ rid: string }> }) {
  const { rid } = await ctx.params;
  const target = new URL(req.url).searchParams.get('u');

  // Only allow http(s) targets — never an open redirect to javascript:, etc.
  let safeTarget: string | null = null;
  if (target) {
    try {
      const parsed = new URL(target);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        safeTarget = parsed.toString();
      }
    } catch {
      safeTarget = null;
    }
  }

  if (rid) {
    try {
      await connectToDatabase();
      await recordRecipientEvent(rid, 'click', safeTarget ? { url: safeTarget } : undefined);
      // Fire the link_clicked event for the workflow engine.
      const recipient = await CampaignRecipient.findById(rid).select('orgId').lean();
      if (recipient) {
        await enqueue(QUEUE_NAMES.workflowRun, {
          orgId: recipient.orgId.toString(),
          event: 'link_clicked',
          contextRef: { kind: 'CampaignRecipient', id: rid },
        });
      }
    } catch {
      // Tracking must never block the redirect.
    }
  }

  return NextResponse.redirect(safeTarget ?? env.APP_URL);
}
