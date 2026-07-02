import { expect, test } from "@playwright/test";

test.describe("security posture", () => {
  test("serves baseline security headers on public pages", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["cross-origin-opener-policy"]).toBe("same-origin");
    expect(response?.headers()["permissions-policy"]).toContain("camera=()");
  });

  test("keeps admin noindexed and does not expose lead tables without auth", async ({
    page,
  }) => {
    await page.goto("/admin");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
    await expect(page.getByLabel("Jeton administrateur")).toBeVisible();
    await expect(page.getByText("Derniers leads")).toHaveCount(0);
    await expect(page.getByText("Derniers diagnostics")).toHaveCount(0);
  });

  test("disallows admin crawling in robots.txt", async ({ page }) => {
    const response = await page.goto("/robots.txt");

    expect(response?.ok()).toBe(true);
    await expect(page.locator("body")).toContainText("Disallow: /admin");
  });
});
