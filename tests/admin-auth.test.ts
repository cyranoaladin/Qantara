import { describe, expect, it } from "vitest";

import {
  assertAdminConfigured,
  getAdminCookieOptions,
  hashAdminToken,
  isAdminTokenConfigured,
  verifyAdminTokenValue,
} from "@/lib/admin-auth";

describe("admin auth hardening", () => {
  it("treats missing or placeholder tokens as unconfigured", () => {
    expect(isAdminTokenConfigured(undefined)).toBe(false);
    expect(isAdminTokenConfigured("")).toBe(false);
    expect(isAdminTokenConfigured("change-me")).toBe(false);
    expect(isAdminTokenConfigured("strong-admin-token")).toBe(true);
  });

  it("fails explicitly in production when admin token is missing or weak", () => {
    expect(() => assertAdminConfigured(undefined, "production")).toThrow("ADMIN_TOKEN");
    expect(() => assertAdminConfigured("change-me", "production")).toThrow("ADMIN_TOKEN");
    expect(() => assertAdminConfigured("strong-admin-token", "production")).not.toThrow();
  });

  it("verifies tokens with a hash comparison and rejects invalid values", () => {
    expect(verifyAdminTokenValue("submitted-token", "submitted-token")).toBe(true);
    expect(verifyAdminTokenValue("submitted-token", "other-token")).toBe(false);
    expect(verifyAdminTokenValue("short", "a-much-longer-token")).toBe(false);
    expect(hashAdminToken("submitted-token")).toHaveLength(64);
  });

  it("limits admin cookie scope and secures it in production", () => {
    expect(getAdminCookieOptions("production")).toMatchObject({
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/admin",
      maxAge: 60 * 60 * 8,
    });
    expect(getAdminCookieOptions("development").secure).toBe(false);
  });
});
