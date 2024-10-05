import { test, expect, Page } from '@playwright/test';

type LatLng = { lat: number; lng: number };

const getLocation = async (page: Page) => {
  await page.waitForFunction(
    () => '__LEAFLET_MAP__' in window && document.querySelector('.leaflet-pan-anim') === null,
  );
  return page.evaluate(() => {
    const map = (window as unknown as { __LEAFLET_MAP__: { getCenter: () => LatLng } })
      .__LEAFLET_MAP__;
    return map.getCenter();
  });
};

const expectLocationToBeCloseTo = async (page: Page, { lat, lng }: LatLng) => {
  const { lat: currLat, lng: currLng } = await getLocation(page);
  expect(currLat).toBeCloseTo(lat, 5);
  expect(currLng).toBeCloseTo(lng, 5);
};

const expectLocationToNotBeCloseTo = async (page: Page, { lat, lng }: LatLng) => {
  const { lat: currLat, lng: currLng } = await getLocation(page);
  expect(currLat).not.toBeCloseTo(lat, 5);
  expect(currLng).not.toBeCloseTo(lng, 5);
};

const waitForCurrentLocationMark = (page: Page) => {
  return page.locator('g > path[stroke="red"]').waitFor();
};

test('show current location on load', async ({ page, context }) => {
  await context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });
  await page.goto('/');
  await waitForCurrentLocationMark(page);
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });
});

test('move to current location on button click', async ({ page, context }) => {
  await context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });

  // Check that starting location is current location
  await page.goto('/');
  await waitForCurrentLocationMark(page);
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

  // Drag map
  await page.getByTestId('map').dragTo(page.locator('body'), { targetPosition: { x: 300, y: 0 } });
  await expectLocationToNotBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

  // Move back to current location
  await page.getByTestId('btn-current-location').click();
  await waitForCurrentLocationMark(page);
  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });
});
