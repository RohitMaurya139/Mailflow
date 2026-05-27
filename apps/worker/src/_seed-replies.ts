// Temporary: synthesize inbound replies for the demo campaign so the inbox,
// AI analysis, workflow, and analytics have data.
import './load-env';
import {
  connectToDatabase,
  disconnectFromDatabase,
  Message,
  Thread,
  mongoose,
} from '@mailflow/db';
import { parseRawEmail } from '@mailflow/email';
import { enqueue } from '@mailflow/queue';
import { QUEUE_NAMES } from '@mailflow/shared';
import { ingestParsedMessage } from './lib/inbound';

const REPLIES = [
  "Yes — this looks really interesting! Could we set up a quick call next week?",
  'Thanks for reaching out. What does pricing look like for a team of 10?',
  'Please remove me from this list, not interested.',
];

async function run(): Promise<void> {
  const campaignId = process.env.CAMP;
  if (!campaignId) {
    console.log('CAMP env required');
    process.exit(1);
  }
  await connectToDatabase();

  const threads = await Thread.find({ campaignId: new mongoose.Types.ObjectId(campaignId) })
    .limit(REPLIES.length)
    .lean();

  let n = 0;
  for (const thread of threads) {
    const out = await Message.findOne({ threadId: thread._id, direction: 'out' }).lean();
    if (!out) continue;
    const body = REPLIES[n % REPLIES.length];
    const raw = [
      `From: ${out.to[0]}`,
      `To: ${out.from}`,
      `Subject: Re: ${out.subject}`,
      `In-Reply-To: ${out.messageId}`,
      `References: ${out.messageId}`,
      `Message-ID: <demo-reply-${Date.now()}-${n}@example.com>`,
      `Date: ${new Date().toUTCString()}`,
      '',
      body,
    ].join('\r\n');

    const parsed = await parseRawEmail(raw);
    const res = await ingestParsedMessage({
      orgId: out.orgId.toString(),
      accountId: out.emailAccountId.toString(),
      parsed,
    });
    if (res.messageDbId) {
      await enqueue(QUEUE_NAMES.aiAnalyze, {
        orgId: out.orgId.toString(),
        messageId: res.messageDbId,
      });
    }
    console.log(`reply ${n + 1} ingested → ${out.to[0]}`);
    n++;
  }

  await disconnectFromDatabase();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
