import { test } from '@playwright/test';

const PAGES = [
  ['/', 'home-desktop'],
  ['/shop', 'shop-desktop'],
  ['/products/dried-carrot', 'pdp-desktop'],
  ['/wholesale', 'wholesale-desktop'],
  ['/cart', 'cart-desktop'],
  ['/checkout', 'checkout-desktop'],
];

for (const [path, name] of PAGES) {
  test(`snapshot ${name} (desktop)`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    if (path === '/cart' || path === '/checkout') {
      // Seed the cart with one item for richer rendering.
      await page.goto('/products/dried-carrot');
      await page
        .getByRole('main')
        .getByRole('button', { name: /add to cart/i })
        .first()
        .click();
    }
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  });
}

test('snapshot home (mobile)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
});

test('snapshot pdp (mobile)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/products/dried-carrot');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/pdp-mobile.png', fullPage: true });
});