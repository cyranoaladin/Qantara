"use server";

import { createHash } from "node:crypto";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { prisma } from "@/lib/db";
import { sendDiagnosticNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
import {
  calculateMaturityScore,
  diagnosticSchema,
} from "@/lib/validators/diagnostic.schema";
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

  const maturityScore = calculateMaturityScore(parsed.data);

  try {
    const meta = await getRequestMeta();

    await prisma.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          organization: parsed.data.organization,
          source: "diagnostic-ia",
          need: parsed.data.mainPain,
          sector: parsed.data.sector,
          organizationType: parsed.data.organizationType,
          budgetRange: parsed.data.budgetRange,
          timeline: parsed.data.timeline,
          notes: parsed.data.targetUseCases,
          consent: parsed.data.consent,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        },
      });

      await tx.diagnosticRequest.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          organization: parsed.data.organization,
          organizationType: parsed.data.organizationType,
          sector: parsed.data.sector,
          teamSize: parsed.data.teamSize,
          currentTools: parsed.data.currentTools,
          mainPain: parsed.data.mainPain,
          targetUseCases: parsed.data.targetUseCases,
          dataSensitivity: parsed.data.dataSensitivity,
          timeline: parsed.data.timeline,
          budgetRange: parsed.data.budgetRange,
          message: parsed.data.message,
          maturityScore,
          consent: parsed.data.consent,
          leadId: lead.id,
        },
      });
    });

    await sendDiagnosticNotification(parsed.data, maturityScore);
    revalidatePath("/admin");

    return {
      status: "success",
      message:
        "Votre demande de diagnostic IA a été enregistrée. Qantara AI vous recontactera pour cadrer les prochaines étapes.",
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
