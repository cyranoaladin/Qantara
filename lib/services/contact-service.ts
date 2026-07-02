import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
import type { ContactInput } from "@/lib/validators/contact.schema";

import type { RequestMeta, ServiceOptions } from "./types";

type ContactServiceOptions = ServiceOptions & {
  meta?: RequestMeta;
  sendNotification?: (input: ContactInput) => Promise<void>;
};

export async function submitContactData(
  input: ContactInput,
  {
    db = prisma,
    meta = {},
    sendNotification = sendContactNotification,
  }: ContactServiceOptions = {},
): Promise<ActionState> {
  try {
    await db.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          organization: input.organization,
          role: input.role,
          source: "contact",
          need: input.subject,
          notes: input.message,
          consent: input.consent,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        },
      });

      await tx.contactMessage.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          organization: input.organization,
          role: input.role,
          subject: input.subject,
          message: input.message,
          consent: input.consent,
          leadId: lead.id,
        },
      });
    });

    await sendNotification(input);

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
