import type { Job } from 'bullmq';
import { getRawMessage, parseRawEmail } from '@mailflow/email';
import { enqueue, type InboundProcessJob } from '@mailflow/queue';
import { QUEUE_NAMES } from '@mailflow/shared';

import { logger } from '../logger';
import { gmailClientOptions, loadAccountWithSecrets } from '../lib/provider';
import { ingestParsedMessage } from '../lib/inbound';

/**
 * Fetch a single inbound message (currently Gmail), parse it, and run it
 * through the reconciliation engine. Enqueues ai-analyze for new replies.
 */
export async function processInboundProcess(job: Job<InboundProcessJob>): Promise<void> {
  const { orgId, accountId, providerMessageId } = job.data;
  const log = logger.child({ worker: 'inbound-process', providerMessageId });

  const account = await loadAccountWithSecrets(accountId);
  if (!account) return;

  let raw: Buffer | null = null;
  if (account.provider === 'gmail') {
    raw = await getRawMessage(gmailClientOptions(account), providerMessageId);
  }
  if (!raw) {
    log.warn('no raw message available');
    return;
  }

  const parsed = await parseRawEmail(raw);
  const result = await ingestParsedMessage({ orgId, accountId, parsed });

  if (result.deduped) {
    log.debug('duplicate message — skipped');
    return;
  }

  // Hand off to the AI analyzer (Phase 6).
  if (result.messageDbId) {
    await enqueue(
      QUEUE_NAMES.aiAnalyze,
      { orgId, messageId: result.messageDbId },
      { jobId: `ai-${result.messageDbId}` },
    );
  }
  log.info({ threadId: result.threadId, isReply: result.isReply }, 'processed inbound');
}
