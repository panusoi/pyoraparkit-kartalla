import { test, expect } from '@playwright/test';

test('show closest parking spots with correct distances', async ({ page, context }) => {
  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  await page.goto('/');

  // Open menu on mobile
  const menuOpen = await page.getByTestId('menu').isVisible();
  if (!menuOpen) {
    await page.getByTestId('btn-menu-open').click();
  }
  await expect(page.getByTestId('menu')).toBeVisible();

  await expect(
    page.getByTestId('spot-list').getByTestId('spot-tre:279').getByTestId('distance'),
  ).toHaveText('101 m');

  await expect(
    page.getByTestId('spot-list').getByTestId('spot-tre:21').getByTestId('distance'),
  ).toHaveText('140 m');
});
