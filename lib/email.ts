import { Resend } from "resend";

import type { ContactInput } from "@/lib/validators/contact.schema";
import type { DiagnosticInput } from "@/lib/validators/diagnostic.schema";
import type { NewsletterInput } from "@/lib/validators/newsletter.schema";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

const fromEmail = "Qantara AI <onboarding@resend.dev>";

async function sendInternalEmail({ subject, html, replyTo }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTERNAL_CONTACT_EMAIL ?? "contact@qantara-ai.com";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] ${subject} -> ${to}`);
    }
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      replyTo,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[email:dev] Resend error", error);
    }
  }
}

export function sendContactNotification(input: ContactInput) {
  return sendInternalEmail({
    subject: `Nouveau contact Qantara AI — ${input.subject}`,
    replyTo: input.email,
    html: renderKeyValueEmail("Nouveau message de contact", {
      Nom: input.name,
      Email: input.email,
      Téléphone: input.phone ?? "Non renseigné",
      Organisation: input.organization ?? "Non renseignée",
      Rôle: input.role ?? "Non renseigné",
      Sujet: input.subject,
      Message: input.message,
    }),
  });
}

export function sendDiagnosticNotification(
  input: DiagnosticInput,
  maturityScore: number,
) {
  return sendInternalEmail({
    subject: `Nouvelle demande diagnostic IA — ${input.organization}`,
    replyTo: input.email,
    html: renderKeyValueEmail("Nouvelle demande de diagnostic IA", {
      Nom: input.name,
      Email: input.email,
      Téléphone: input.phone ?? "Non renseigné",
      Organisation: input.organization,
      "Type d'organisation": input.organizationType,
      Secteur: input.sector,
      Équipe: input.teamSize,
      "Outils actuels": input.currentTools ?? "Non renseigné",
      "Problème principal": input.mainPain,
      "Cas d'usage visés": input.targetUseCases,
      "Sensibilité des données": input.dataSensitivity,
      Calendrier: input.timeline,
      Budget: input.budgetRange ?? "Non renseigné",
      "Score maturité": `${maturityScore}/100`,
      Message: input.message ?? "Non renseigné",
    }),
  });
}

export function sendNewsletterNotification(input: NewsletterInput) {
  return sendInternalEmail({
    subject: `Nouvelle inscription checklist IA — ${input.email}`,
    replyTo: input.email,
    html: renderKeyValueEmail("Nouvelle inscription checklist IA", {
      Prénom: input.firstName,
      Email: input.email,
      Organisation: input.organization ?? "Non renseignée",
      "Type d'organisation": input.organizationType ?? "Non renseigné",
    }),
  });
}

function renderKeyValueEmail(title: string, values: Record<string, string>) {
  const rows = Object.entries(values)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;">${escapeHtml(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;color:#0f172a;"><h1>${escapeHtml(title)}</h1><table style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table></div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
