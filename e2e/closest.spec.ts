import { test, expect } from '@playwright/test';
import { expectForFocusMarker, expectLocationToBeCloseTo } from './helper';

test('show closest parking spots with correct distances', async ({ page, context }) => {
  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  await page.goto('/');

  // Open menu on mobile
  const isMobile = await page.getByTestId('menu').isHidden();
  if (isMobile) {
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

test('show spot on map', async ({ page, context }) => {
  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  await page.goto('/');
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

  // Open menu on mobile
  const isMobile = await page.getByTestId('menu').isHidden();
  if (isMobile) {
    await page.getByTestId('btn-menu-open').click();
  }
  await expect(page.getByTestId('menu')).toBeVisible();

  await page.getByTestId('spot-list').getByTestId('spot-tre:47').scrollIntoViewIfNeeded();
  await page
    .getByTestId('spot-list')
    .getByTestId('spot-tre:47')
    .getByTestId('spot-btn-show-tre:47')
    .click();

  // Menu should be hidden on mobile after click
  if (isMobile) {
    await expect(page.getByTestId('menu')).toBeHidden();
  }

  await expectLocationToBeCloseTo(
    page,
    {
      lng: 23.76856750337577,
      lat: 61.495246666824926,
    },
    4,
  );
  await expectForFocusMarker(page);
});
