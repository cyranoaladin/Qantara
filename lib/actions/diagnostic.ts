"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import type { ActionState } from "@/lib/actions/types";
import { submitDiagnosticData } from "@/lib/services/diagnostic-service";
import { diagnosticSchema } from "@/lib/validators/diagnostic.schema";
import { formDataToObject } from "@/lib/validators/shared";

export async function submitDiagnostic(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = diagnosticSchema.safeParse(normalizeFormData(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs du diagnostic doivent être corrigés.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await submitDiagnosticData(parsed.data, {
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
