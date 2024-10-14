import { expect, test } from '@playwright/test';

test.describe('auto detect language', () => {
  test('fi', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'languages', {
        get: () => ['fi-FI', 'fi', 'en-US', 'en'],
      });
    });
    await page.goto('/');
    expect(await page.locator('html').getAttribute('lang')).toBe('fi');
  });

  test('en', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en', 'fi-FI', 'fi'],
      });
    });
    await page.goto('/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
  });

  test('fallback to default', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'languages', {
        get: () => ['nl', 'se'],
      });
    });
    await page.goto('/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
  });
});
