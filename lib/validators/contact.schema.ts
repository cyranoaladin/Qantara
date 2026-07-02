import { z } from "zod";

import {
  consentField,
  emailField,
  honeypotField,
  optionalText,
  requiredText,
} from "./shared";

export const contactSchema = z.object({
  name: requiredText(2, 120, "Le nom"),
  email: emailField,
  phone: optionalText(40),
  organization: optionalText(160),
  role: optionalText(120),
  subject: requiredText(3, 180, "Le sujet"),
  message: requiredText(20, 4000, "Le message"),
  consent: consentField,
  honeypot: honeypotField,
});

export type ContactInput = z.infer<typeof contactSchema>;
