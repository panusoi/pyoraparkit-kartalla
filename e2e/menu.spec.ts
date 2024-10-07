import { test, expect } from '@playwright/test';

test.describe('large screens', () => {
  const viewPort = { width: 1080, height: 1920 };

  test('menu is open by default ', async ({ page }) => {
    await page.setViewportSize(viewPort);
    await page.goto('/');
    await expect(page.getByTestId('menu')).toBeVisible();
  });

  test('menu can be opened and closed', async ({ page }) => {
    await page.setViewportSize(viewPort);
    await page.goto('/');
    await expect(page.getByTestId('menu')).toBeVisible();
    await page.getByTestId('btn-menu-close').click();
    await expect(page.getByTestId('menu')).toBeHidden();
    await page.getByTestId('btn-menu-open').click();
    await expect(page.getByTestId('menu')).toBeVisible();
  });
});

test.describe('small screens', () => {
  const viewPort = { width: 480, height: 720 };

  test('menu is closed by default ', async ({ page }) => {
    await page.setViewportSize(viewPort);
    await page.goto('/');
    await expect(page.getByTestId('menu')).toBeHidden();
  });

  test('menu can be opened and closed', async ({ page }) => {
    await page.setViewportSize(viewPort);
    await page.goto('/');
    await expect(page.getByTestId('menu')).toBeHidden();
    await page.getByTestId('btn-menu-open').click();
    await expect(page.getByTestId('menu')).toBeVisible();
    await page.getByTestId('btn-menu-close').click();
    await expect(page.getByTestId('menu')).toBeHidden();
  });
});
