import { z } from "zod";

import {
  consentField,
  emailField,
  honeypotField,
  optionalText,
  requiredText,
} from "./shared";

export const newsletterSchema = z.object({
  firstName: requiredText(2, 80, "Le prénom"),
  email: emailField,
  organization: optionalText(160),
  organizationType: optionalText(120),
  consent: consentField,
  honeypot: honeypotField,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
