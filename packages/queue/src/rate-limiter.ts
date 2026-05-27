/**
 * Per-account send rate limiting. Enforces hourly + daily caps atomically in
 * Redis via a Lua script (check-then-increment in one round trip), using
 * fixed time-bucket keys that expire on their own.
 */
import { getRedis } from './connection';

// Returns {1} when a token was consumed, or {0, "hour"|"day"} when capped.
const CONSUME_LUA = `
local h = tonumber(redis.call('GET', KEYS[1]) or '0')
local d = tonumber(redis.call('GET', KEYS[2]) or '0')
if h + 1 > tonumber(ARGV[1]) then return {0, 'hour'} end
if d + 1 > tonumber(ARGV[2]) then return {0, 'day'} end
local nh = redis.call('INCR', KEYS[1])
if nh == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[3])) end
local nd = redis.call('INCR', KEYS[2])
if nd == 1 then redis.call('EXPIRE', KEYS[2], tonumber(ARGV[4])) end
return {1, ''}
`;

export interface ConsumeResult {
  allowed: boolean;
  reason?: 'hour' | 'day';
  /** Suggested delay (ms) before retrying when not allowed. */
  retryAfterMs?: number;
}

function bucketKeys(accountId: string, now = new Date()): { hour: string; day: string } {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const h = String(now.getUTCHours()).padStart(2, '0');
  return {
    hour: `rate:${accountId}:h:${y}${m}${d}${h}`,
    day: `rate:${accountId}:d:${y}${m}${d}`,
  };
}

function msUntilNextHour(now = new Date()): number {
  const next = new Date(now);
  next.setUTCHours(now.getUTCHours() + 1, 0, 0, 0);
  return next.getTime() - now.getTime();
}

function msUntilNextDay(now = new Date()): number {
  const next = new Date(now);
  next.setUTCDate(now.getUTCDate() + 1);
  next.setUTCHours(0, 0, 0, 0);
  return next.getTime() - now.getTime();
}

/**
 * Try to consume one send token for an account. When denied, returns a
 * `retryAfterMs` aligned to when the relevant window resets.
 */
export async function consumeSendToken(
  accountId: string,
  caps: { hourlyCap: number; dailyCap: number },
): Promise<ConsumeResult> {
  const now = new Date();
  const keys = bucketKeys(accountId, now);

  const result = (await getRedis().eval(
    CONSUME_LUA,
    2,
    keys.hour,
    keys.day,
    String(caps.hourlyCap),
    String(caps.dailyCap),
    String(Math.ceil(msUntilNextHour(now) / 1000) + 60),
    String(Math.ceil(msUntilNextDay(now) / 1000) + 60),
  )) as [number, string];

  const [allowed, reason] = result;
  if (allowed === 1) return { allowed: true };

  return {
    allowed: false,
    reason: reason as 'hour' | 'day',
    retryAfterMs: reason === 'day' ? msUntilNextDay(now) : msUntilNextHour(now),
  };
}

/** Current usage counts for an account (for health/analytics display). */
export async function getSendUsage(
  accountId: string,
): Promise<{ hour: number; day: number }> {
  const keys = bucketKeys(accountId);
  const [h, d] = await getRedis().mget(keys.hour, keys.day);
  return { hour: Number(h ?? 0), day: Number(d ?? 0) };
}
