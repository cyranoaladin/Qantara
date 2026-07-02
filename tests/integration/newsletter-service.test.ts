import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { submitNewsletterData } from "@/lib/services/newsletter-service";
import { newsletterSchema } from "@/lib/validators/newsletter.schema";

import { cleanDatabase, newsletterInput, prisma } from "./helpers";

describe("newsletter service integration with PostgreSQL", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it("creates and updates a subscriber without duplicates", async () => {
    const parsed = newsletterSchema.parse({
      ...newsletterInput,
      email: "NEWSLETTER.INTEGRATION@QANTARA-AI.TEST",
    });

    const first = await submitNewsletterData(parsed, {
      db: prisma,
      sendNotification: async () => {},
    });
    const second = await submitNewsletterData(
      { ...parsed, firstName: "Ala" },
      { db: prisma, sendNotification: async () => {} },
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

  it("rejects invalid email, honeypot and missing consent before database writes", async () => {
    expect(
      newsletterSchema.safeParse({ ...newsletterInput, email: "invalid-email" }).success,
    ).toBe(false);
    expect(
      newsletterSchema.safeParse({ ...newsletterInput, honeypot: "bot" }).success,
    ).toBe(false);
    expect(
      newsletterSchema.safeParse({ ...newsletterInput, consent: false }).success,
    ).toBe(false);
    expect(await prisma.newsletterSubscriber.count()).toBe(0);
  });
});
