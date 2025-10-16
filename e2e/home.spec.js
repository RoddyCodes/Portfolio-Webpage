/* eslint-env node */

const { test, expect } = require('@playwright/test');

const waitForTheme = async (page) => {
  await page.waitForFunction(() => !!document.documentElement.getAttribute('data-theme'));
};

test.describe('Portfolio homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForTheme(page);
  });

  test('renders hero information and resume highlights', async ({ page }) => {
    await expect(page).toHaveTitle(/Ryan Pham/);
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Pham' })).toBeVisible();
    await expect(page.locator('#resume')).toBeVisible();
    await expect(page.locator('#resume h2')).toHaveText('Resume Highlights');
    await expect(page.getByRole('heading', { name: 'Professional Experience' })).toBeVisible();
  });

  test('toggles between light and dark themes', async ({ page }) => {
    const toggle = page.locator('[data-theme-toggle]');
    const label = toggle.locator('[data-theme-label]');

    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(initialTheme).toBe('light');
    await expect(label).toHaveText('Light');

    await toggle.click();
    await page.waitForTimeout(100); // allow DOM updates to propagate
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(label).toHaveText('Dark');

    await toggle.click();
    await page.waitForTimeout(100);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(label).toHaveText('Light');
  });

  test('renders resume tech logos and role icons', async ({ page }) => {
    const techLogos = page.locator('#resume figure img');
    await expect(techLogos).toHaveCount(9);
    await techLogos.evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode().catch(() => null))));
    const techMeta = await techLogos.evaluateAll((imgs) =>
      imgs.map((img) => ({ alt: img.alt, width: img.naturalWidth, height: img.naturalHeight }))
    );
    techMeta.forEach((meta) => {
      expect(meta.width).toBeGreaterThan(0);
      expect(meta.height).toBeGreaterThan(0);
      expect(meta.alt).not.toHaveLength(0);
    });

    const roleIcons = page.locator('#resume .rounded-2xl img');
    await expect(roleIcons).toHaveCount(4);
    await roleIcons.evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode().catch(() => null))));
    const roleMeta = await roleIcons.evaluateAll((imgs) =>
      imgs.map((img) => ({ alt: img.alt, width: img.naturalWidth, height: img.naturalHeight }))
    );
    roleMeta.forEach((meta) => {
      expect(meta.width).toBeGreaterThan(0);
      expect(meta.height).toBeGreaterThan(0);
      expect(meta.alt).not.toHaveLength(0);
    });
  });

  test('contact links are reachable', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await expect(contactSection.getByRole('link', { name: /gmail/i })).toHaveAttribute('href', 'mailto:roddyscodingservice@gmail.com');
    await expect(contactSection.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/RoddyCodes');
    await expect(contactSection.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/ryan-pham-385637181/');
  });
});

test.describe('Blog page', () => {
  test('lists latest posts with working routes', async ({ page }) => {
    await page.goto('/blog/index.html');
    await waitForTheme(page);

    const postEntries = page.locator('.post-entry');
    await expect(postEntries).toHaveCount(2);

    const newestPostLink = postEntries
      .nth(0)
      .getByRole('link', { name: /Starting My Master's Journey at NJIT/i });
    await expect(newestPostLink).toHaveAttribute('href', 'post.html?post=starting-masters-at-njit');

    await newestPostLink.click();
    await expect(page).toHaveURL(/blog\/post\.html\?post=starting-masters-at-njit/);
    await expect(page.locator('#post-title')).toHaveText(/Starting Masters At Njit/i);
    await expect(page.locator('#post-content')).toContainText('Machine Learning course');
  });
});
