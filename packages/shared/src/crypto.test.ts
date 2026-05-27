import { describe, expect, it } from 'vitest';

import { safeStringEqual } from './crypto';

describe('safeStringEqual', () => {
  it('returns true for identical strings', () => {
    expect(safeStringEqual('s3cret-token', 's3cret-token')).toBe(true);
    expect(safeStringEqual('', '')).toBe(true);
  });

  it('returns false for different strings', () => {
    expect(safeStringEqual('s3cret-token', 's3cret-toker')).toBe(false);
    expect(safeStringEqual('token', 'TOKEN')).toBe(false);
  });

  it('returns false for different-length strings without throwing', () => {
    expect(safeStringEqual('short', 'a-much-longer-value')).toBe(false);
    expect(safeStringEqual('value', '')).toBe(false);
  });
});
