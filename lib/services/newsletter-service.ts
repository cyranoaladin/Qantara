import { prisma } from "@/lib/db";
import { sendNewsletterNotification } from "@/lib/email";
import type { ActionState } from "@/lib/actions/types";
import type { NewsletterInput } from "@/lib/validators/newsletter.schema";

import type { ServiceOptions } from "./types";

type NewsletterServiceOptions = ServiceOptions & {
  sendNotification?: (input: NewsletterInput) => Promise<void>;
};

export async function submitNewsletterData(
  input: NewsletterInput,
  {
    db = prisma,
    sendNotification = sendNewsletterNotification,
  }: NewsletterServiceOptions = {},
): Promise<ActionState> {
  try {
    await db.newsletterSubscriber.upsert({
      where: { email: input.email },
      update: {
        firstName: input.firstName,
        organization: input.organization,
        organizationType: input.organizationType,
        status: "active",
        consent: input.consent,
      },
      create: {
        firstName: input.firstName,
        email: input.email,
        organization: input.organization,
        organizationType: input.organizationType,
        consent: input.consent,
      },
    });

    await sendNotification(input);

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
