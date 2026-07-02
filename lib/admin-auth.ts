import { createHash } from "node:crypto";

import { cookies } from "next/headers";

const adminCookieName = "qantara_admin";

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN !== "change-me");
}

export async function isAdminAuthenticated() {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(adminCookieName)?.value;

  return cookieValue === hashToken(token);
}

export async function setAdminSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, hashToken(token), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export function verifyAdminToken(token: string) {
  return Boolean(process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
