import { describe, expect, it } from "vitest";

import { escapeHtml, resolveEmailConfig } from "@/lib/email";

describe("email configuration and rendering", () => {
  it("escapes HTML content in email templates", () => {
    expect(escapeHtml(`<script>"&'</script>`)).toBe(
      "&lt;script&gt;&quot;&amp;&#039;&lt;/script&gt;",
    );
  });

  it("disables email sending when Resend is not configured", () => {
    expect(
      resolveEmailConfig({
        NODE_ENV: "development",
        RESEND_API_KEY: "",
        INTERNAL_CONTACT_EMAIL: "contact@qantara-ai.com",
      }).enabled,
    ).toBe(false);
  });

  it("requires a production from address when Resend is enabled", () => {
    expect(() =>
      resolveEmailConfig({
        NODE_ENV: "production",
        RESEND_API_KEY: "test-key",
        INTERNAL_CONTACT_EMAIL: "contact@qantara-ai.com",
        RESEND_FROM_EMAIL: "",
      }),
    ).toThrow("RESEND_FROM_EMAIL");
  });

  it("validates the internal recipient address", () => {
    expect(() =>
      resolveEmailConfig({
        NODE_ENV: "production",
        RESEND_API_KEY: "test-key",
        INTERNAL_CONTACT_EMAIL: "invalid-recipient",
        RESEND_FROM_EMAIL: "Qantara AI <contact@qantara-ai.com>",
      }),
    ).toThrow("INTERNAL_CONTACT_EMAIL");
  });

  it("uses the configured Resend from address", () => {
    expect(
      resolveEmailConfig({
        NODE_ENV: "production",
        RESEND_API_KEY: "test-key",
        INTERNAL_CONTACT_EMAIL: "contact@qantara-ai.com",
        RESEND_FROM_EMAIL: "Qantara AI <notifications@qantara-ai.com>",
      }),
    ).toMatchObject({
      enabled: true,
      from: "Qantara AI <notifications@qantara-ai.com>",
      to: "contact@qantara-ai.com",
    });
  });
});
