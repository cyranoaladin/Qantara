import { expect, test } from "@playwright/test";

test.describe("contact form validation", () => {
  test("keeps required fields invalid on an empty submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.locator('input[name="name"]')).toBeFocused();
    await expect(page.locator('input[name="name"]')).toHaveJSProperty(
      "validity.valid",
      false,
    );
    await expect(page.locator('input[name="email"]')).toHaveJSProperty(
      "validity.valid",
      false,
    );
  });

  test("shows a server validation error for malformed content", async ({ page }) => {
    await page.goto("/contact");

    await page.locator('input[name="name"]').fill("A");
    await page.locator('input[name="email"]').fill("contact@qantara-ai.com");
    await page.locator('input[name="subject"]').fill("IA");
    await page.locator('textarea[name="message"]').fill("Trop court");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.getByText("Certains champs doivent être corrigés.")).toBeVisible();
  });

  test("blocks honeypot submissions before any database write", async ({ page }) => {
    await page.goto("/contact");

    await page.locator('input[name="name"]').fill("Alaeddine BEN RHOUMA");
    await page.locator('input[name="email"]').fill("contact@qantara-ai.com");
    await page.locator('input[name="subject"]').fill("Diagnostic IA");
    await page
      .locator('textarea[name="message"]')
      .fill(
        "Nous souhaitons cadrer une démarche IA responsable avec des livrables clairs.",
      );
    await page.locator('input[name="consent"]').check();
    await page.locator('input[name="honeypot"]').evaluate((input) => {
      (input as HTMLInputElement).value = "bot-value";
    });
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.getByText("Certains champs doivent être corrigés.")).toBeVisible();
  });
});
