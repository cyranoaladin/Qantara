import { expect, test } from "@playwright/test";

const routes = [
  "/services",
  "/formations",
  "/studio",
  "/gouvernance",
  "/education",
  "/ressources",
  "/contact",
  "/diagnostic-ia",
] as const;

test.describe("main public navigation", () => {
  for (const route of routes) {
    test(`${route} responds and exposes one H1`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});
