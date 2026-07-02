import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

import { assertSafeIntegrationDatabaseUrl } from "@/lib/testing/assert-safe-integration-database-url";

export const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for integration tests.");
}

assertSafeIntegrationDatabaseUrl(databaseUrl);

export const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

export const contactInput = {
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

export const diagnosticInput = {
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

export const newsletterInput = {
  firstName: "Alaeddine",
  email: "newsletter.integration@qantara-ai.test",
  organization: "Qantara AI",
  organizationType: "PME",
  consent: true,
  honeypot: "",
};

export async function cleanDatabase() {
  await prisma.contactMessage.deleteMany();
  await prisma.diagnosticRequest.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.resourceDownload.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.adminUser.deleteMany();
}
