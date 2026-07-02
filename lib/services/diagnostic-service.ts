import { prisma } from "@/lib/db";
import { sendDiagnosticNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
import {
  calculateMaturityScore,
  type DiagnosticInput,
} from "@/lib/validators/diagnostic.schema";

import type { RequestMeta, ServiceOptions } from "./types";

type DiagnosticServiceOptions = ServiceOptions & {
  meta?: RequestMeta;
  sendNotification?: (input: DiagnosticInput, maturityScore: number) => Promise<void>;
};

export async function submitDiagnosticData(
  input: DiagnosticInput,
  {
    db = prisma,
    meta = {},
    sendNotification = sendDiagnosticNotification,
  }: DiagnosticServiceOptions = {},
): Promise<ActionState> {
  const maturityScore = calculateMaturityScore(input);

  try {
    await db.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          organization: input.organization,
          source: "diagnostic-ia",
          need: input.mainPain,
          sector: input.sector,
          organizationType: input.organizationType,
          budgetRange: input.budgetRange,
          timeline: input.timeline,
          notes: input.targetUseCases,
          consent: input.consent,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        },
      });

      await tx.diagnosticRequest.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          organization: input.organization,
          organizationType: input.organizationType,
          sector: input.sector,
          teamSize: input.teamSize,
          currentTools: input.currentTools,
          mainPain: input.mainPain,
          targetUseCases: input.targetUseCases,
          dataSensitivity: input.dataSensitivity,
          timeline: input.timeline,
          budgetRange: input.budgetRange,
          message: input.message,
          maturityScore,
          consent: input.consent,
          leadId: lead.id,
        },
      });
    });

    await sendNotification(input, maturityScore);

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
