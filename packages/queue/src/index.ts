/**
 * @mailflow/queue — BullMQ queues + Redis connection shared by web + worker.
 * Server-only (connects to Redis).
 */
export { getRedis, closeRedis } from './connection';
export { getQueue, enqueue, Queues, closeQueues } from './queues';
export { consumeSendToken, getSendUsage, type ConsumeResult } from './rate-limiter';
export * from './jobs';
