import { test, expect } from '@playwright/test';

// Environment check: the SUT servers answer and both frontends render in this browser.
test.describe('Environment smoke check', () => {
  test('backend API returns the seeded categories', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/categories');
    expect(response.ok()).toBeTruthy();
    const categories = await response.json();
    expect(categories.length).toBeGreaterThan(0);
  });

  test('customer web renders the product list', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('frontend-web');
    await expect(page.getByRole('heading', { name: 'Danh sách sản phẩm' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Xem chi tiết' }).first()).toBeVisible();
  });

  test('admin web renders its start page', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page).toHaveTitle('frontend-admin');
    await expect(page.locator('#root')).not.toBeEmpty();
  });
});
