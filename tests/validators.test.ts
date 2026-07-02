import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/validators/contact.schema";
import {
  calculateMaturityScore,
  diagnosticSchema,
} from "@/lib/validators/diagnostic.schema";
import { newsletterSchema } from "@/lib/validators/newsletter.schema";

const validContact = {
  name: "Alaeddine BEN RHOUMA",
  email: "contact@qantara-ai.com",
  phone: "+21600000000",
  organization: "Qantara AI",
  role: "Direction",
  subject: "Diagnostic IA",
  message:
    "Nous souhaitons cadrer une démarche IA responsable avec formation, gouvernance et premiers cas d'usage mesurables.",
  consent: true,
  honeypot: "",
};

const validDiagnostic = {
  name: "Alaeddine BEN RHOUMA",
  email: "diagnostic@qantara-ai.com",
  phone: "+21600000000",
  organization: "Qantara AI",
  organizationType: "PME",
  sector: "Services",
  teamSize: "6-20",
  currentTools: "ChatGPT, Notion AI",
  mainPain:
    "Les usages IA sont dispersés entre les équipes et les risques ne sont pas cadrés.",
  targetUseCases:
    "Assistant documentaire interne, automatisation de reporting et support aux équipes métier.",
  dataSensitivity: "Données internes non sensibles",
  timeline: "Sous 3 mois",
  budgetRange: "Sur devis",
  message: "Priorité à une première feuille de route pragmatique.",
  consent: true,
  honeypot: "",
};

const validNewsletter = {
  firstName: "Alaeddine",
  email: "Checklist@QANTARA-AI.COM ",
  organization: "Qantara AI",
  organizationType: "PME",
  consent: true,
  honeypot: "",
};

describe("contactSchema", () => {
  it("accepts a valid contact message", () => {
    const result = contactSchema.safeParse(validContact);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "adresse-invalide",
    });

    expect(result.success).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("blocks honeypot submissions", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      honeypot: "bot-value",
    });

    expect(result.success).toBe(false);
  });

  it("normalizes email casing and trims text fields", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      name: "  Alaeddine  ",
      email: "CONTACT@QANTARA-AI.COM ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alaeddine");
      expect(result.data.email).toBe("contact@qantara-ai.com");
    }
  });

  it("enforces maximum text lengths", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: "x".repeat(4001),
    });

    expect(result.success).toBe(false);
  });
});

describe("diagnosticSchema", () => {
  it("accepts a valid diagnostic request", () => {
    const result = diagnosticSchema.safeParse(validDiagnostic);

    expect(result.success).toBe(true);
  });

  it("requires organization context", () => {
    const result = diagnosticSchema.safeParse({
      ...validDiagnostic,
      organization: "",
    });

    expect(result.success).toBe(false);
  });

  it("requires a main pain", () => {
    const result = diagnosticSchema.safeParse({
      ...validDiagnostic,
      mainPain: "",
    });

    expect(result.success).toBe(false);
  });

  it("requires target use cases", () => {
    const result = diagnosticSchema.safeParse({
      ...validDiagnostic,
      targetUseCases: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid data sensitivity values", () => {
    const result = diagnosticSchema.safeParse({
      ...validDiagnostic,
      dataSensitivity: "Données ultra confidentielles",
    });

    expect(result.success).toBe(false);
  });

  it("requires explicit consent and blocks honeypot submissions", () => {
    expect(
      diagnosticSchema.safeParse({ ...validDiagnostic, consent: false }).success,
    ).toBe(false);
    expect(
      diagnosticSchema.safeParse({ ...validDiagnostic, honeypot: "spam" }).success,
    ).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid newsletter subscription", () => {
    const result = newsletterSchema.safeParse(validNewsletter);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("checklist@qantara-ai.com");
    }
  });

  it("rejects an invalid email", () => {
    const result = newsletterSchema.safeParse({
      ...validNewsletter,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = newsletterSchema.safeParse({
      ...validNewsletter,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("blocks honeypot submissions", () => {
    const result = newsletterSchema.safeParse({
      ...validNewsletter,
      honeypot: "automated",
    });

    expect(result.success).toBe(false);
  });
});

describe("calculateMaturityScore", () => {
  it("always returns a score between 0 and 100", () => {
    const score = calculateMaturityScore({
      currentTools: "ChatGPT, Notion AI",
      dataSensitivity: "Données personnelles",
      timeline: "Sous 1 mois",
      targetUseCases:
        "Assistant documentaire, automatisation reporting et qualification des demandes.",
      teamSize: "21-50",
    });

    expect(Number.isNaN(score)).toBe(false);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("increases with existing tools, clear use cases and a near timeline", () => {
    const exploratoryScore = calculateMaturityScore({
      currentTools: "",
      dataSensitivity: "Données sensibles",
      timeline: "Exploration",
      targetUseCases: "Assistant interne.",
      teamSize: "1",
    });
    const readyScore = calculateMaturityScore({
      currentTools: "ChatGPT, n8n",
      dataSensitivity: "Données internes non sensibles",
      timeline: "Sous 1 mois",
      targetUseCases:
        "Assistant documentaire interne, automatisation de reporting et tri des demandes entrantes.",
      teamSize: "21-50",
    });

    expect(readyScore).toBeGreaterThan(exploratoryScore);
  });

  it("penalizes sensitive data exposure", () => {
    const baseline = {
      currentTools: "ChatGPT",
      timeline: "Sous 3 mois",
      targetUseCases:
        "Assistant documentaire interne avec mesure de qualité et validation humaine.",
      teamSize: "6-20",
    } as const;

    const internalDataScore = calculateMaturityScore({
      ...baseline,
      dataSensitivity: "Données internes non sensibles",
    });
    const sensitiveDataScore = calculateMaturityScore({
      ...baseline,
      dataSensitivity: "Données sensibles",
    });

    expect(sensitiveDataScore).toBeLessThan(internalDataScore);
  });
});
