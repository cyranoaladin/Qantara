import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

test.describe("home page", () => {
  test("responds with the main Qantara AI positioning", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Transformer l'IA en usages métier utiles/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Planifier un diagnostic IA/i }).first(),
    ).toBeVisible();
  });

  test("shows key landing sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /Un accompagnement IA de bout en bout/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Des formats conçus pour réduire l'incertitude/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Réponses aux questions les plus posées/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Votre organisation utilise déjà l'IA/i,
      }),
    ).toBeVisible();
  });

  for (const viewport of viewports) {
    test(`does not create horizontal overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );

      expect(hasOverflow).toBe(false);
    });
  }
});
