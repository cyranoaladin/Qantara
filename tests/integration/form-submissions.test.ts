import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { submitContactData } from "@/lib/services/contact-service";
import { submitDiagnosticData } from "@/lib/services/diagnostic-service";
import { submitNewsletterData } from "@/lib/services/newsletter-service";
import { contactSchema } from "@/lib/validators/contact.schema";
import { diagnosticSchema } from "@/lib/validators/diagnostic.schema";
import { newsletterSchema } from "@/lib/validators/newsletter.schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for integration tests.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

const contactInput = {
  name: "Alaeddine BEN RHOUMA",
  email: "contact.integration@qantara-ai.test",
  phone: "+21600000000",
  organization: "Qantara AI",
  role: "Direction",
  subject: "Diagnostic IA",
  message:
    "Nous souhaitons cadrer une démarche IA responsable avec des cas d'usage mesurables.",
  consent: true,
  honeypot: "",
};

const diagnosticInput = {
  name: "Alaeddine BEN RHOUMA",
  email: "diagnostic.integration@qantara-ai.test",
  phone: "+21600000001",
  organization: "Qantara AI",
  organizationType: "PME",
  sector: "Services",
  teamSize: "6-20",
  currentTools: "ChatGPT, Notion AI",
  mainPain:
    "Les usages IA sont dispersés et les risques ne sont pas suivis par la direction.",
  targetUseCases:
    "Assistant documentaire interne, reporting et automatisation de qualification des demandes.",
  dataSensitivity: "Données internes non sensibles",
  timeline: "Sous 3 mois",
  budgetRange: "Sur devis",
  message: "Priorité à une roadmap pragmatique.",
  consent: true,
  honeypot: "",
};

const newsletterInput = {
  firstName: "Alaeddine",
  email: "newsletter.integration@qantara-ai.test",
  organization: "Qantara AI",
  organizationType: "PME",
  consent: true,
  honeypot: "",
};

describe("form submission integration with PostgreSQL", () => {
  beforeEach(async () => {
    await cleanDatabase();
    process.env.RESEND_API_KEY = "";
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it("creates a Lead and ContactMessage for a valid contact submission", async () => {
    const parsed = contactSchema.parse(contactInput);

    const result = await submitContactData(parsed, {
      db: prisma,
      meta: { ipHash: "hashed-ip", userAgent: "vitest" },
    });

    expect(result.status).toBe("success");
    expect(await prisma.lead.count()).toBe(1);
    expect(await prisma.contactMessage.count()).toBe(1);
    await expect(
      prisma.lead.findFirstOrThrow({ where: { source: "contact" } }),
    ).resolves.toMatchObject({
      email: "contact.integration@qantara-ai.test",
      consent: true,
      ipHash: "hashed-ip",
      userAgent: "vitest",
    });
  });

  it("creates a Lead and DiagnosticRequest with a maturity score", async () => {
    const parsed = diagnosticSchema.parse(diagnosticInput);

    const result = await submitDiagnosticData(parsed, {
      db: prisma,
      meta: { ipHash: "diagnostic-ip", userAgent: "vitest" },
    });

    expect(result.status).toBe("success");
    expect(await prisma.lead.count()).toBe(1);
    expect(await prisma.diagnosticRequest.count()).toBe(1);
    const diagnostic = await prisma.diagnosticRequest.findFirstOrThrow();
    expect(diagnostic).toMatchObject({
      email: "diagnostic.integration@qantara-ai.test",
      organization: "Qantara AI",
      consent: true,
    });
    expect(diagnostic.maturityScore).toBeGreaterThanOrEqual(0);
    expect(diagnostic.maturityScore).toBeLessThanOrEqual(100);
  });

  it("upserts newsletter subscribers without creating duplicates", async () => {
    const parsed = newsletterSchema.parse(newsletterInput);

    const first = await submitNewsletterData(parsed, { db: prisma });
    const second = await submitNewsletterData(
      { ...parsed, firstName: "Ala" },
      { db: prisma },
    );

    expect(first.status).toBe("success");
    expect(second.status).toBe("success");
    expect(await prisma.newsletterSubscriber.count()).toBe(1);
    await expect(prisma.newsletterSubscriber.findFirstOrThrow()).resolves.toMatchObject({
      email: "newsletter.integration@qantara-ai.test",
      firstName: "Ala",
      status: "active",
      consent: true,
    });
  });

  it("blocks honeypot and missing consent before any database write", async () => {
    expect(contactSchema.safeParse({ ...contactInput, honeypot: "bot" }).success).toBe(
      false,
    );
    expect(
      newsletterSchema.safeParse({ ...newsletterInput, consent: false }).success,
    ).toBe(false);
    expect(await prisma.lead.count()).toBe(0);
    expect(await prisma.newsletterSubscriber.count()).toBe(0);
  });

  it("returns a neutral error when PostgreSQL is unavailable", async () => {
    const unavailableDb = new PrismaClient({
      adapter: new PrismaPg("postgresql://qantara:qantara@localhost:1/qantara_ai_test"),
    });

    try {
      const result = await submitContactData(contactSchema.parse(contactInput), {
        db: unavailableDb,
        sendNotification: async () => {},
      });

      expect(result.status).toBe("error");
      expect(result.message).toContain("La demande n'a pas pu être enregistrée");
      expect(result.message).not.toContain(contactInput.email);
      expect(await prisma.lead.count()).toBe(0);
    } finally {
      await unavailableDb.$disconnect();
    }
  });
});

async function cleanDatabase() {
  await prisma.contactMessage.deleteMany();
  await prisma.diagnosticRequest.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.resourceDownload.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.adminUser.deleteMany();
}
