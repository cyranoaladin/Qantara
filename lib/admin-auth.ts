import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const adminCookieName = "qantara_admin";
const placeholderAdminToken = "change-me";

type RuntimeEnv = "development" | "production" | "test" | string;

export function isAdminTokenConfigured(token = process.env.ADMIN_TOKEN): token is string {
  return Boolean(token && token.trim() && token !== placeholderAdminToken);
}

export function assertAdminConfigured(
  token = process.env.ADMIN_TOKEN,
  nodeEnv: RuntimeEnv = process.env.NODE_ENV,
) {
  if (nodeEnv === "production" && !isAdminTokenConfigured(token)) {
    throw new Error(
      "ADMIN_TOKEN must be configured with a strong non-placeholder value in production.",
    );
  }
}

export function isAdminConfigured() {
  assertAdminConfigured();

  return isAdminTokenConfigured();
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
