import { test } from '@playwright/test';

test('logo — header (desktop)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 200 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const header = page.locator('header').first();
  await header.screenshot({ path: 'test-results/logo-header-desktop.png' });
});

test('logo — footer (desktop)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 600 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const footer = page.locator('footer').first();
  await footer.scrollIntoViewIfNeeded();
  await footer.screenshot({ path: 'test-results/logo-footer-desktop.png' });
});

test('logo — header (mobile)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 200 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const header = page.locator('header').first();
  await header.screenshot({ path: 'test-results/logo-header-mobile.png' });
});