"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { sendNewsletterNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
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

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {
        firstName: parsed.data.firstName,
        organization: parsed.data.organization,
        organizationType: parsed.data.organizationType,
        status: "active",
        consent: parsed.data.consent,
      },
      create: {
        firstName: parsed.data.firstName,
        email: parsed.data.email,
        organization: parsed.data.organization,
        organizationType: parsed.data.organizationType,
        consent: parsed.data.consent,
      },
    });

    await sendNewsletterNotification(parsed.data);
    revalidatePath("/admin");

    return {
      status: "success",
      message:
        "Votre demande est bien prise en compte. Si cette adresse est déjà inscrite, aucune duplication ne sera créée.",
    };
  } catch {
    return {
      status: "error",
      message:
        "L'inscription n'a pas pu être enregistrée pour le moment. Vous pouvez réessayer plus tard.",
    };
  }
}

function normalizeFormData(formData: FormData) {
  return {
    ...formDataToObject(formData),
    consent: formData.get("consent") === "on",
  };
}
