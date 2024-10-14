import { expect, test } from '@playwright/test';

test('change language', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('html').getAttribute('lang')).toBe('en');

  const isMobile = await page.getByTestId('menu').isHidden();
  if (isMobile) {
    await page.getByTestId('btn-menu-open').click();
  }
  await page.getByTestId('tab-settings').click();
  await page.getByTestId('language-selector').selectOption('fi');

  expect(await page.locator('html').getAttribute('lang')).toBe('fi');
  await page.reload();
  expect(await page.locator('html').getAttribute('lang')).toBe('fi');
});

test('change theme', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('html').getAttribute('class')).toBe(null);

  const isMobile = await page.getByTestId('menu').isHidden();
  if (isMobile) {
    await page.getByTestId('btn-menu-open').click();
  }
  await page.getByTestId('tab-settings').click();
  await page.getByTestId('theme-selector').selectOption('dark');

  expect(await page.locator('html').getAttribute('class')).toBe('dark');
  await page.reload();
  expect(await page.locator('html').getAttribute('class')).toBe('dark');
});
