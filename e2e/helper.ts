import { expect, Page } from '@playwright/test';

type LatLng = { lat: number; lng: number };

export const expectCurrentLocationMarker = async (page: Page) => {
  await expect(page.locator('g > path[stroke="red"]')).toBeVisible();
};

export const expectForFocusMarker = async (page: Page) => {
  await expect(page.locator('g > path[stroke="blue"]')).toBeVisible();
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
  await expect
    .poll(async () => {
      return (await getLocation(page)).lat;
    })
    .toBeCloseTo(lat, numDigits);

  await expect
    .poll(async () => {
      return (await getLocation(page)).lng;
    })
    .toBeCloseTo(lng, numDigits);
};

export const expectLocationToNotBeCloseTo = async (
  page: Page,
  { lat, lng }: LatLng,
  numDigits = 5,
) => {
  await expect
    .poll(async () => {
      return (await getLocation(page)).lat;
    })
    .not.toBeCloseTo(lat, numDigits);

  await expect
    .poll(async () => {
      return (await getLocation(page)).lng;
    })
    .not.toBeCloseTo(lng, numDigits);
};
