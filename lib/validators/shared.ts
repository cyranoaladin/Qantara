import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const optionalText = (max = 500) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(max, "Texte trop long.").optional(),
  );

export const requiredText = (min: number, max: number, label: string) =>
  z
    .string({ error: `${label} est requis.` })
    .trim()
    .min(min, `${label} doit contenir au moins ${min} caractères.`)
    .max(max, `${label} est trop long.`);

export const emailField = z
  .string({ error: "L'email est requis." })
  .trim()
  .email("Adresse email invalide.")
  .max(180, "Adresse email trop longue.")
  .toLowerCase();

export const consentField = z.literal(true, {
  error: "Le consentement est obligatoire.",
});

export const honeypotField = z
  .string()
  .max(0, "Le formulaire n'a pas pu être envoyé.")
  .optional()
  .default("");

export const formDataToObject = (formData: FormData) =>
  Object.fromEntries(formData.entries());
