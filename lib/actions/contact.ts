"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
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

  try {
    const meta = await getRequestMeta();

    await prisma.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          organization: parsed.data.organization,
          role: parsed.data.role,
          source: "contact",
          need: parsed.data.subject,
          notes: parsed.data.message,
          consent: parsed.data.consent,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        },
      });

      await tx.contactMessage.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          organization: parsed.data.organization,
          role: parsed.data.role,
          subject: parsed.data.subject,
          message: parsed.data.message,
          consent: parsed.data.consent,
          leadId: lead.id,
        },
      });
    });

    await sendContactNotification(parsed.data);
    revalidatePath("/admin");

    return {
      status: "success",
      message:
        "Votre message a bien été transmis. Qantara AI vous répondra dans les meilleurs délais.",
    };
  } catch {
    return {
      status: "error",
      message:
        "La demande n'a pas pu être enregistrée pour le moment. Vous pouvez réessayer ou écrire directement à contact@qantara-ai.com.",
    };
  }
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
