"use server";

import { redirect } from "next/navigation";

import type { ActionState } from "@/lib/actions/types";
import { clearAdminSession, setAdminSession, verifyAdminToken } from "@/lib/admin-auth";

export async function loginAdmin(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");

  if (!verifyAdminToken(token)) {
    return {
      status: "error",
      message: "Jeton administrateur invalide.",
    };
  }

  await setAdminSession(token);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}
