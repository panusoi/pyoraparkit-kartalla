import { test } from '@playwright/test';
import {
  expectCurrentLocationMarker,
  expectLocationToBeCloseTo,
  expectLocationToNotBeCloseTo,
} from './helper';

test('show current location on load', async ({ page, context }) => {
  await context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });
  await page.goto('/');
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });
  await expectCurrentLocationMarker(page);
});

test('move to current location on button click', async ({ page, context }) => {
  await context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  // Check that starting location is current location
  await page.goto('/');
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });
  await expectCurrentLocationMarker(page);

  // Drag map
  await page.getByTestId('map').dragTo(page.locator('body'), { targetPosition: { x: 300, y: 0 } });
  await expectLocationToNotBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

  // Move back to current location
  await page.getByTestId('btn-current-location').click();
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });
  await expectCurrentLocationMarker(page);
});
