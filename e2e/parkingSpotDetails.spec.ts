import { test, expect } from '@playwright/test';
import { expectLocationToBeCloseTo } from './helper';

test('show parking spot details', async ({ page, context }) => {
  const isMobile = await page.getByTestId('menu').isHidden();

  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  await page.goto('/');
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

  // Check that details are closed
  if (!isMobile) {
    await expect(page.getByTestId('menu')).toBeVisible();
  }
  await expect(page.getByTestId('parking-spot-details')).toBeHidden();

  // Click marker
  await page.getByTitle('Ratina (tre:253)').click();

  // Check that details is open and distance is calculated
  await expect(page.getByTestId('parking-spot-details')).toBeVisible();
  await expect(page.getByTestId('menu')).toBeHidden();
  await expect(
    page.getByTestId('parking-spot-details').getByTestId('spot-tre:253').getByTestId('distance'),
  ).toHaveText('160 m');

  // Close details
  await page.getByTestId('btn-spot-details-close').click();
  if (!isMobile) {
    await expect(page.getByTestId('menu')).toBeVisible();
  }
  await expect(page.getByTestId('parking-spot-details')).toBeHidden();
});
