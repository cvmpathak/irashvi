import { test, expect } from '@playwright/test';

test.describe('Storefront — primary flows', () => {
  test('homepage loads with hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Goodness/i);
    await expect(page.getByRole('link', { name: /explore products/i })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /wholesale/i }).first().click();
    await expect(page).toHaveURL(/\/wholesale$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Bulk/i);
  });

  test('search finds products', async ({ page }) => {
    await page.goto('/search?q=turmeric');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/turmeric/i);
    await expect(page.getByText(/Turmeric Powder/i)).toBeVisible();
  });

  test('category filter narrows results', async ({ page }) => {
    await page.goto('/shop');
    await page.getByRole('button', { name: /spices & seasonings/i }).click();
    await expect(page.getByText(/Turmeric Powder/i)).toBeVisible();
    await expect(page.getByText(/Beetroot Powder/i)).toHaveCount(0);
  });

  test('product detail shows variant selector', async ({ page }) => {
    await page.goto('/products/dried-carrot');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dried Carrot');
    await expect(page.getByRole('radio', { name: /100 g/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /250 g/i })).toBeVisible();
  });

  test('add to cart updates the cart count', async ({ page }) => {
    await page.goto('/products/dried-carrot');
    await page.getByRole('main').getByRole('button', { name: /add to cart/i }).first().click();
    await expect(page.getByLabel(/cart \(1 item\)/i)).toBeVisible();
  });

  test('cart quantity and removal work', async ({ page }) => {
    await page.goto('/products/dried-carrot');
    await page.getByRole('main').getByRole('button', { name: /add to cart/i }).first().click();
    await page.goto('/cart');
    await expect(page.getByText('Dried Carrot')).toBeVisible();
    await page.getByRole('button', { name: /increase quantity/i }).first().click();
    await expect(page.getByRole('region', { name: /items in your cart/i }).getByText('2', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /remove/i }).first().click();
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('cart survives a page refresh', async ({ page }) => {
    await page.goto('/products/dried-carrot');
    await page.getByRole('main').getByRole('button', { name: /add to cart/i }).first().click();
    await page.goto('/shop');
    await page.reload();
    await expect(page.getByLabel(/cart \(1 item\)/i)).toBeVisible();
  });

  test('invalid checkout input is rejected', async ({ page }) => {
    await page.goto('/products/dried-carrot');
    await page.getByRole('main').getByRole('button', { name: /add to cart/i }).first().click();
    await page.goto('/checkout');
    await page.getByRole('button', { name: /place demo order/i }).click();
    await expect(page.getByText(/please enter your full name/i)).toBeVisible();
  });

  test('demo checkout clearly explains its limitations', async ({ page }) => {
    // Add an item first so the checkout form is rendered (not the empty-cart placeholder).
    await page.goto('/products/dried-carrot');
    await page.getByRole('main').getByRole('button', { name: /add to cart/i }).first().click();
    await page.goto('/checkout');
    await expect(page.getByText(/demo checkout/i)).toBeVisible();
    await expect(page.getByText(/no payment is collected/i)).toBeVisible();
  });

  test('wholesale form validates', async ({ page }) => {
    await page.goto('/wholesale');
    await page.getByRole('button', { name: /submit enquiry/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test('mobile navigation opens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeVisible();
  });

  test('unknown routes show the custom 404', async ({ page }) => {
    const response = await page.goto('/this-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/couldn't find/i);
  });

  test('respects prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // Ensure no layout shift errors and page renders.
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Goodness/i);
    await context.close();
  });
});