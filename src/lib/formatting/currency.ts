const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const NUMBER_FORMATTER = new Intl.NumberFormat('en-IN');

export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return INR_FORMATTER.format(value);
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return NUMBER_FORMATTER.format(value);
}

export function formatPackSize(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}