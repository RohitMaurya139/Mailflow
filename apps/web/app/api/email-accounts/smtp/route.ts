import { EmailAccount, encrypt } from '@mailflow/db';
import { SmtpProvider } from '@mailflow/email';
import { DEFAULT_CAPS, smtpConnectSchema } from '@mailflow/shared';

import { badRequest, conflict, ok, parseBody } from '@/lib/api';
import { withOrg } from '@/lib/withOrg';
import { audit } from '@/lib/audit';
import { sanitizeAccount } from '@/lib/email-account';

/** Connect an SMTP mailbox. We verify the connection before saving. */
export const POST = withOrg(
  async (req, ctx) => {
    const parsed = await parseBody(req, smtpConnectSchema);
    if (!parsed.ok) return parsed.response;
    const input = parsed.data;

    // Fail fast if credentials/host are wrong.
    try {
      await new SmtpProvider({
        host: input.host,
        port: input.port,
        user: input.user,
        pass: input.pass,
        secure: input.secure,
      }).verify();
    } catch (error) {
      console.error('[smtp connect] verify failed:', error);
      return badRequest('Could not connect with those SMTP settings');
    }

    const existing = await EmailAccount.findOne({
      orgId: ctx.orgId,
      fromEmail: input.fromEmail,
    });
    if (existing) return conflict('A mailbox with that address is already connected');

    const account = await EmailAccount.create({
      orgId: ctx.orgId,
      provider: 'smtp',
      displayName: input.displayName,
      fromEmail: input.fromEmail,
      fromName: input.fromName,
      auth: {
        host: input.host,
        port: input.port,
        user: input.user,
        pass: encrypt(input.pass),
        secure: input.secure,
      },
      limits: { ...DEFAULT_CAPS.smtp, warmupDay: 0 },
      health: { status: 'connected', sentToday: 0, bouncesToday: 0 },
    });

    await audit({
      orgId: ctx.orgId,
      actorId: ctx.userId,
      action: 'account.connect',
      target: { kind: 'EmailAccount', id: account._id.toString() },
      meta: { provider: 'smtp', email: input.fromEmail },
    });

    return ok({ account: sanitizeAccount(account) }, { status: 201 });
  },
  { role: 'admin' },
);
