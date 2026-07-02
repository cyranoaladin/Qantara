import { z } from "zod";

import {
  consentField,
  emailField,
  honeypotField,
  optionalText,
  requiredText,
} from "./shared";

export const organizationTypeOptions = [
  "PME",
  "Établissement scolaire",
  "Université",
  "Cabinet professionnel",
  "Association / ONG",
  "Institution",
  "Indépendant",
  "Autre",
] as const;

export const dataSensitivityOptions = [
  "Données publiques",
  "Données internes non sensibles",
  "Données personnelles",
  "Données sensibles",
  "Je ne sais pas",
] as const;

export const timelineOptions = [
  "Immédiatement",
  "Sous 1 mois",
  "Sous 3 mois",
  "Cette année",
  "Exploration",
] as const;

export const diagnosticSchema = z.object({
  name: requiredText(2, 120, "Le nom"),
  email: emailField,
  phone: optionalText(40),
  organization: requiredText(2, 180, "L'organisation"),
  organizationType: z.enum(organizationTypeOptions, {
    error: "Le type d'organisation est requis.",
  }),
  sector: requiredText(2, 140, "Le secteur"),
  teamSize: requiredText(1, 80, "La taille de l'équipe"),
  currentTools: optionalText(1000),
  mainPain: requiredText(10, 1600, "Le problème principal"),
  targetUseCases: requiredText(10, 1600, "Les cas d'usage visés"),
  dataSensitivity: z.enum(dataSensitivityOptions, {
    error: "Le niveau de sensibilité des données est requis.",
  }),
  timeline: z.enum(timelineOptions, {
    error: "Le calendrier est requis.",
  }),
  budgetRange: optionalText(120),
  message: optionalText(2000),
  consent: consentField,
  honeypot: honeypotField,
});

export type DiagnosticInput = z.infer<typeof diagnosticSchema>;

export type MaturityScoreInput = Pick<
  DiagnosticInput,
  "currentTools" | "dataSensitivity" | "targetUseCases" | "teamSize" | "timeline"
>;

export function calculateMaturityScore(input: MaturityScoreInput): number {
  let score = 20;

  if (input.currentTools && input.currentTools.trim().length > 3) score += 18;
  if (input.targetUseCases.trim().length > 40) score += 18;
  if (["Immédiatement", "Sous 1 mois", "Sous 3 mois"].includes(input.timeline)) {
    score += 14;
  }
  if (!["Je ne sais pas", "Données sensibles"].includes(input.dataSensitivity)) {
    score += 12;
  }
  if (!["1", "1-5"].includes(input.teamSize.trim())) score += 10;
  if (input.dataSensitivity === "Données personnelles") score -= 4;
  if (input.dataSensitivity === "Données sensibles") score -= 8;

  return Math.max(0, Math.min(100, score));
}
