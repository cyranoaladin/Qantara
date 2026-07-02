import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { submitContactData } from "@/lib/services/contact-service";
import { contactSchema } from "@/lib/validators/contact.schema";

import { cleanDatabase, contactInput, prisma } from "./helpers";

describe("contact service integration with PostgreSQL", () => {
  beforeEach(async () => {
    await cleanDatabase();
    process.env.RESEND_API_KEY = "";
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it("creates a Lead and linked ContactMessage for a valid submission", async () => {
    const parsed = contactSchema.parse(contactInput);

    const result = await submitContactData(parsed, {
      db: prisma,
      meta: { ipHash: "hashed-ip", userAgent: "vitest" },
    });

    expect(result.status).toBe("success");

    const lead = await prisma.lead.findFirstOrThrow({
      where: { email: "contact.integration@qantara-ai.test" },
    });
    const message = await prisma.contactMessage.findFirstOrThrow({
      where: { email: "contact.integration@qantara-ai.test" },
    });

    expect(lead).toMatchObject({
      source: "contact",
      need: "Diagnostic IA",
      consent: true,
      ipHash: "hashed-ip",
      userAgent: "vitest",
    });
    expect(message).toMatchObject({
      subject: "Diagnostic IA",
      consent: true,
      leadId: lead.id,
    });
  });

  it("blocks honeypot and missing consent before database writes", async () => {
    expect(contactSchema.safeParse({ ...contactInput, honeypot: "bot" }).success).toBe(
      false,
    );
    expect(contactSchema.safeParse({ ...contactInput, consent: false }).success).toBe(
      false,
    );
    expect(await prisma.lead.count()).toBe(0);
    expect(await prisma.contactMessage.count()).toBe(0);
  });

  it("returns a neutral error when PostgreSQL is unavailable", async () => {
    const unavailableDb = new PrismaClient({
      adapter: new PrismaPg("postgresql://localhost:1/qantara_ai_test"),
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
      expect(await prisma.contactMessage.count()).toBe(0);
    } finally {
      await unavailableDb.$disconnect();
    }
  });
});
