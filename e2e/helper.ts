import { expect, Page } from '@playwright/test';

type LatLng = { lat: number; lng: number };

export const expectCurrentLocationMarker = (page: Page) => {
  expect(page.locator('g > path[stroke="red"]')).toBeVisible();
};

export const expectForFocusMarker = (page: Page) => {
  expect(page.locator('g > path[stroke="blue"]')).toBeVisible();
};

export const getLocation = async (page: Page) => {
  await page.waitForFunction(
    () => '__LEAFLET_MAP__' in window && document.querySelector('.leaflet-pan-anim') === null,
  );
  return page.evaluate(() => {
    const map = (window as unknown as { __LEAFLET_MAP__: { getCenter: () => LatLng } })
      .__LEAFLET_MAP__;
    return map.getCenter();
  });
};

export const expectLocationToBeCloseTo = async (
  page: Page,
  { lat, lng }: LatLng,
  numDigits = 5,
) => {
  const { lat: currLat, lng: currLng } = await getLocation(page);
  expect(currLat).toBeCloseTo(lat, numDigits);
  expect(currLng).toBeCloseTo(lng, numDigits);
};

export const expectLocationToNotBeCloseTo = async (
  page: Page,
  { lat, lng }: LatLng,
  numDigits = 5,
) => {
  const { lat: currLat, lng: currLng } = await getLocation(page);
  expect(currLat).not.toBeCloseTo(lat, numDigits);
  expect(currLng).not.toBeCloseTo(lng, numDigits);
};
