import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/formations",
  "/studio",
  "/gouvernance",
  "/education",
  "/diagnostic-ia",
  "/contact",
] as const;

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

test.describe("responsive public pages", () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route} has no horizontal overflow on ${viewport.name}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.goto(route);

        await expect(page.locator("header")).toBeVisible();
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("footer")).toBeVisible();

        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        expect(hasOverflow).toBe(false);
      });
    }
  }
});
