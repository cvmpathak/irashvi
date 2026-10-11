import { describe, expect, it } from 'vitest';
import { formatINR, formatNumber } from '@/lib/formatting/currency';

describe('formatINR', () => {
  it('formats whole numbers with the rupee sign', () => {
    expect(formatINR(150)).toMatch(/₹/);
    expect(formatINR(150)).toMatch(/150/);
  });

  it('handles zero and negatives', () => {
    expect(formatINR(0)).toMatch(/0/);
    expect(formatINR(-1)).toMatch(/-/);
  });

  it('falls back to a dash for non-finite values', () => {
    expect(formatINR(Number.NaN)).toBe('—');
    expect(formatINR(Number.POSITIVE_INFINITY)).toBe('—');
  });
});

describe('formatNumber', () => {
  it('formats numbers with the en-IN grouping', () => {
    expect(formatNumber(1500)).toMatch(/1,500/);
  });
});