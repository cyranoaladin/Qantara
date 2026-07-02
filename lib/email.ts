import { Resend } from "resend";

import type { ContactInput } from "@/lib/validators/contact.schema";
import type { DiagnosticInput } from "@/lib/validators/diagnostic.schema";
import type { NewsletterInput } from "@/lib/validators/newsletter.schema";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

type EmailEnvironment = Partial<
  Pick<
    NodeJS.ProcessEnv,
    "NODE_ENV" | "RESEND_API_KEY" | "RESEND_FROM_EMAIL" | "INTERNAL_CONTACT_EMAIL"
  >
>;

type EmailConfig =
  | {
      enabled: false;
      to: string;
      from: string;
    }
  | {
      enabled: true;
      apiKey: string;
      to: string;
      from: string;
    };

const defaultInternalEmail = "contact@qantara-ai.com";
const developmentFromEmail = "Qantara AI <contact@qantara-ai.com>";

export function resolveEmailConfig(env: EmailEnvironment = process.env): EmailConfig {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.INTERNAL_CONTACT_EMAIL?.trim() || defaultInternalEmail;
  const from = env.RESEND_FROM_EMAIL?.trim() || "";
  const nodeEnv = env.NODE_ENV ?? "development";

  if (!isEmailAddress(to)) {
    throw new Error("INTERNAL_CONTACT_EMAIL must be a valid email address.");
  }

  if (!apiKey) {
    return {
      enabled: false,
      to,
      from: from || developmentFromEmail,
    };
  }

  if (nodeEnv === "production" && !from) {
    throw new Error("RESEND_FROM_EMAIL is required when Resend is enabled.");
  }

  return {
    enabled: true,
    apiKey,
    to,
    from: from || developmentFromEmail,
  };
}

async function sendInternalEmail(payload: EmailPayload) {
  let config: EmailConfig;

  try {
    config = resolveEmailConfig();
  } catch (error) {
    logEmailError("configuration", error);
    return;
  }

  if (!config.enabled) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] notification skipped -> ${config.to}`);
    }
    return;
  }

  const resend = new Resend(config.apiKey);

  try {
    await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
  } catch (error) {
    logEmailError("resend", error);
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

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function logEmailError(stage: "configuration" | "resend", error: unknown) {
  if (process.env.NODE_ENV === "production") {
    console.error(`[email] ${stage} error`);
    return;
  }

  console.error(`[email:dev] ${stage} error`, error);
}
