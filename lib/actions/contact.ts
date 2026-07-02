"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import type { ActionState } from "@/lib/actions/types";
import { submitContactData } from "@/lib/services/contact-service";
import { contactSchema } from "@/lib/validators/contact.schema";
import { formDataToObject } from "@/lib/validators/shared";

export async function submitContact(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = contactSchema.safeParse(normalizeFormData(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await submitContactData(parsed.data, {
    meta: await getRequestMeta(),
  });

  if (result.status === "success") {
    revalidatePath("/admin");
  }

  return result;
}

function normalizeFormData(formData: FormData) {
  return {
    ...formDataToObject(formData),
    consent: formData.get("consent") === "on",
  };
}

async function getRequestMeta() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for") ?? "";
  const userAgent = headerStore.get("user-agent") ?? undefined;
  const ipHash = forwardedFor
    ? createHash("sha256").update(forwardedFor).digest("hex")
    : undefined;

  return { ipHash, userAgent };
}
