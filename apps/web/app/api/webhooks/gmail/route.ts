import { connectToDatabase, EmailAccount } from '@mailflow/db';
import { enqueue } from '@mailflow/queue';
import { QUEUE_NAMES } from '@mailflow/shared';
import { env } from '@mailflow/shared/env';

/**
 * Gmail push notifications (Google Cloud Pub/Sub → push subscription).
 * Body: { message: { data: base64(JSON{ emailAddress, historyId }) } }.
 * The subscription is configured with `?token=` which we verify here.
 */
export async function POST(req: Request) {
  // Verify the shared push token when configured.
  if (env.GMAIL_PUBSUB_VERIFICATION_TOKEN) {
    const token = new URL(req.url).searchParams.get('token');
    if (token !== env.GMAIL_PUBSUB_VERIFICATION_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  let emailAddress: string | undefined;
  let historyId: string | undefined;
  try {
    const body = (await req.json()) as { message?: { data?: string } };
    const raw = body.message?.data;
    if (raw) {
      const decoded = JSON.parse(Buffer.from(raw, 'base64').toString('utf8')) as {
        emailAddress?: string;
        historyId?: string | number;
      };
      emailAddress = decoded.emailAddress?.toLowerCase();
      historyId = decoded.historyId ? String(decoded.historyId) : undefined;
    }
  } catch {
    // Malformed push — ack anyway so Pub/Sub doesn't redeliver forever.
    return new Response(null, { status: 204 });
  }

  if (emailAddress) {
    try {
      await connectToDatabase();
      const account = await EmailAccount.findOne({
        provider: 'gmail',
        fromEmail: emailAddress,
      })
        .select('_id orgId')
        .lean();
      if (account) {
        await enqueue(QUEUE_NAMES.inboundFetch, {
          orgId: account.orgId.toString(),
          accountId: account._id.toString(),
          historyId,
        });
      }
    } catch (error) {
      console.error('[webhooks/gmail] error:', error);
      // Still 204: a 5xx makes Pub/Sub retry; the fetch worker is the safety net.
    }
  }

  return new Response(null, { status: 204 });
}
