import { test, expect, Page } from '@playwright/test';
import { expectForFocusMarker, expectLocationToBeCloseTo } from './helper';

/**
 * Navigates to app, opens menu if closed and asserts that menu is visible.
 *
 * @returns `isMobile` boolean
 */
const setup = async (page: Page) => {
  await page.goto('/');

  const isMobile = await page.getByTestId('menu').isHidden();
  if (isMobile) {
    await page.getByTestId('btn-menu-open').click();
  }
  await expect(page.getByTestId('menu')).toBeVisible();
  return { isMobile };
};

test('show closest parking spots with correct distances', async ({ page, context }) => {
  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });
  await setup(page);

  await expect(
    page.getByTestId('spot-list').getByTestId('spot-tre:279').getByTestId('distance'),
  ).toHaveText('101 m');

  await expect(
    page.getByTestId('spot-list').getByTestId('spot-tre:21').getByTestId('distance'),
  ).toHaveText('140 m');
});

test('show spot on map', async ({ page, context }) => {
  context.setGeolocation({ latitude: 61.49444, longitude: 23.76364 });
  const { isMobile } = await setup(page);

  await expectLocationToBeCloseTo(page, { lat: 61.49444, lng: 23.76364 });

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

test.describe('location statuses', () => {
  const mockWatchPositionError = async (page: Page, code: number) => {
    await page.addInitScript((code) => {
      Object.defineProperty(navigator.geolocation, 'watchPosition', {
        configurable: true,
        writable: true,
        value: (_, error) => {
          error({
            code,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
            message: '',
          });
          return 1;
        },
      });
    }, code);
  };

  test('pending', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator.geolocation, 'watchPosition', {
        configurable: true,
        writable: true,
        // Never resolves/rejects
        value: () => {
          return 1;
        },
      });
    });

    await setup(page);
    await expect(page.getByTestId('location-status-pending')).toBeVisible();
  });

  test('blocked', async ({ browser }) => {
    const context = await browser.newContext({ permissions: [] });
    const page = await context.newPage();
    await setup(page);
    await expect(page.getByTestId('location-status-blocked')).toBeVisible();
  });

  test('unavailable', async ({ page }) => {
    await mockWatchPositionError(page, 2);
    await setup(page);
    await expect(page.getByTestId('location-status-unavailable')).toBeVisible();
  });

  test('timeout', async ({ page }) => {
    await mockWatchPositionError(page, 3);
    await setup(page);
    await expect(page.getByTestId('location-status-timeout')).toBeVisible();
  });

  test('error', async ({ page }) => {
    await mockWatchPositionError(page, 4);
    await setup(page);
    await expect(page.getByTestId('location-status-error')).toBeVisible();
  });
});
