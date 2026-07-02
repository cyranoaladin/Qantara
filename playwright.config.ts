import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3187",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev --hostname 127.0.0.1 --port 3187",
    url: "http://127.0.0.1:3187",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: "postgresql://qantara_ci@localhost:5432/qantara_ai",
      NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3187",
      ADMIN_TOKEN: "ci-admin-token-long-enough",
      INTERNAL_CONTACT_EMAIL: "contact@qantara-ai.com",
      RESEND_API_KEY: "",
      RESEND_FROM_EMAIL: "Qantara AI <contact@qantara-ai.com>",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
