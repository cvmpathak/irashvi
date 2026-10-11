import { describe, expect, it } from 'vitest';
import { safeJSONParse } from '@/lib/utils';

describe('safeJSONParse', () => {
  it('returns fallback for null', () => {
    expect(safeJSONParse(null, { default: true })).toEqual({ default: true });
  });

  it('returns fallback for malformed JSON', () => {
    expect(safeJSONParse('{not valid json', 'fallback')).toBe('fallback');
  });

  it('parses valid JSON', () => {
    expect(safeJSONParse('{"a":1}', { default: true })).toEqual({ a: 1 });
  });
});