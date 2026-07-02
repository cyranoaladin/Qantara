"use server";

import { revalidatePath } from "next/cache";

import type { ActionState } from "@/lib/actions/types";
import { submitNewsletterData } from "@/lib/services/newsletter-service";
import { newsletterSchema } from "@/lib/validators/newsletter.schema";
import { formDataToObject } from "@/lib/validators/shared";

export async function submitNewsletter(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = newsletterSchema.safeParse(normalizeFormData(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await submitNewsletterData(parsed.data);

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
