import { expect, test } from "@playwright/test";

test.describe("brand assets", () => {
  test("shows the horizontal logo on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    await expect(
      page
        .getByRole("link", { name: "Accueil Qantara AI" })
        .locator('img[src*="qantara-ai-logo-primary"]'),
    ).toBeVisible();
  });

  test("shows the compact mark on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(
      page
        .getByRole("link", { name: "Accueil Qantara AI" })
        .locator('img[src*="qantara-ai-mark"]'),
    ).toBeVisible();
  });

  test("uses the official SVG favicon", async ({ page }) => {
    await page.goto("/");

    const icons = await page
      .locator(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
      )
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")).filter(Boolean),
      );

    expect(icons).toContain("/brand/qantara-ai-favicon.svg");
  });
});
