/**
 * Resolve a concrete {@link EmailProvider} from a stored account record.
 *
 * The app layer stores secrets encrypted (in @mailflow/db); this module stays
 * decoupled from the database by taking a `decrypt` function as input. Both the
 * web app (test-send / reply) and the worker (campaign send) use this so the
 * provider-construction logic lives in exactly one place.
 */
import type { EmailProvider as ProviderKind } from '@mailflow/shared';
import { GmailProvider } from './providers/gmail';
import { SmtpProvider } from './providers/smtp';
import type { GoogleOAuthConfig } from './oauth/google';
import type { EmailProvider } from './types';

/** Encrypted-or-plain auth bag as persisted on an EmailAccount. */
export interface StoredAuth {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  host?: string;
  port?: number;
  user?: string;
  pass?: string;
  secure?: boolean;
  apiKey?: string;
  domain?: string;
}

export interface StoredAccount {
  provider: ProviderKind;
  auth: StoredAuth;
}

export interface ResolveOptions {
  /** Decrypts a stored secret (e.g. @mailflow/db `decrypt`). */
  decrypt: (ciphertext: string) => string;
  /** OAuth config for Gmail token refresh. Required for gmail accounts. */
  gmailOAuth?: GoogleOAuthConfig;
  /** Persist tokens that googleapis refreshes mid-send. */
  onGmailTokensRefreshed?: (tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
  }) => void | Promise<void>;
}

export function resolveProvider(
  account: StoredAccount,
  opts: ResolveOptions,
): EmailProvider {
  switch (account.provider) {
    case 'gmail': {
      const { accessToken, refreshToken, expiresAt } = account.auth;
      if (!accessToken) throw new Error('Gmail account is missing an access token');
      if (!opts.gmailOAuth) throw new Error('gmailOAuth config is required for Gmail');
      return new GmailProvider({
        oauth: opts.gmailOAuth,
        credentials: {
          accessToken: opts.decrypt(accessToken),
          refreshToken: refreshToken ? opts.decrypt(refreshToken) : undefined,
          expiresAt,
        },
        onTokensRefreshed: opts.onGmailTokensRefreshed,
      });
    }
    case 'smtp': {
      const { host, port, user, pass, secure } = account.auth;
      if (!host || !port || !user || !pass) {
        throw new Error('SMTP account is missing connection details');
      }
      return new SmtpProvider({
        host,
        port,
        user,
        pass: opts.decrypt(pass),
        secure: Boolean(secure),
      });
    }
    default:
      throw new Error(`Unsupported provider: ${account.provider}`);
  }
}
