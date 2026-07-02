import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const adminCookieName = "qantara_admin";
const placeholderAdminTokens = new Set(["change-me", "replace-with-long-random-token"]);
const minimumProductionTokenLength = 32;

type RuntimeEnv = "development" | "production" | "test" | string;

export function isAdminTokenConfigured(token?: string): token is string {
  const normalizedToken = token?.trim();

  return Boolean(normalizedToken && !placeholderAdminTokens.has(normalizedToken));
}

export function assertAdminConfigured(
  token?: string,
  nodeEnv: RuntimeEnv = process.env.NODE_ENV,
) {
  if (nodeEnv !== "production") return;

  const normalizedToken = token?.trim();

  if (!isAdminTokenConfigured(normalizedToken)) {
    throw new Error(
      "ADMIN_TOKEN must be configured with a strong non-placeholder value in production.",
    );
  }

  if (isCiLikeAdminToken(normalizedToken)) {
    throw new Error("ADMIN_TOKEN must not use CI placeholder values in production.");
  }

  if (normalizedToken.length < minimumProductionTokenLength) {
    throw new Error("ADMIN_TOKEN must contain at least 32 characters in production.");
  }
}

export function isAdminConfigured() {
  const token = process.env.ADMIN_TOKEN;
  assertAdminConfigured(token);

  return isAdminTokenConfigured(token);
}

export async function isAdminAuthenticated() {
  const token = process.env.ADMIN_TOKEN;
  if (!isAdminTokenConfigured(token)) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(adminCookieName)?.value;

  return Boolean(cookieValue && verifyAdminTokenHash(token, cookieValue));
}

export async function setAdminSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(
    adminCookieName,
    hashAdminToken(token),
    getAdminCookieOptions(process.env.NODE_ENV),
  );
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export function verifyAdminToken(token: string) {
  return verifyAdminTokenValue(token, process.env.ADMIN_TOKEN);
}

export function verifyAdminTokenValue(submittedToken: string, configuredToken?: string) {
  if (!isAdminTokenConfigured(configuredToken)) return false;

  return verifyAdminTokenHash(submittedToken, hashAdminToken(configuredToken));
}

export function hashAdminToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getAdminCookieOptions(nodeEnv: RuntimeEnv = process.env.NODE_ENV) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: nodeEnv === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  };
}

function verifyAdminTokenHash(submittedToken: string, expectedHash: string) {
  const submittedHash = hashAdminToken(submittedToken);
  const submitted = Buffer.from(submittedHash, "hex");
  const expected = Buffer.from(expectedHash, "hex");

  if (submitted.length !== expected.length) return false;

  return timingSafeEqual(submitted, expected);
}

function isCiLikeAdminToken(token: string) {
  return /^ci[-_]?admin[-_]?token/i.test(token);
}
