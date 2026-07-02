import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { submitDiagnosticData } from "@/lib/services/diagnostic-service";
import { diagnosticSchema } from "@/lib/validators/diagnostic.schema";

import { cleanDatabase, diagnosticInput, prisma } from "./helpers";

describe("diagnostic service integration with PostgreSQL", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it("creates a Lead and linked DiagnosticRequest with a maturity score", async () => {
    const parsed = diagnosticSchema.parse(diagnosticInput);

    const result = await submitDiagnosticData(parsed, {
      db: prisma,
      meta: { ipHash: "diagnostic-ip", userAgent: "vitest" },
      sendNotification: async () => {},
    });

    expect(result.status).toBe("success");

    const lead = await prisma.lead.findFirstOrThrow({
      where: { email: "diagnostic.integration@qantara-ai.test" },
    });
    const diagnostic = await prisma.diagnosticRequest.findFirstOrThrow({
      where: { email: "diagnostic.integration@qantara-ai.test" },
    });

    expect(lead).toMatchObject({
      source: "diagnostic-ia",
      need: diagnosticInput.mainPain,
      sector: "Services",
      organizationType: "PME",
      consent: true,
      ipHash: "diagnostic-ip",
    });
    expect(diagnostic).toMatchObject({
      organization: "Qantara AI",
      consent: true,
      leadId: lead.id,
    });
    expect(diagnostic.maturityScore).toBeGreaterThanOrEqual(0);
    expect(diagnostic.maturityScore).toBeLessThanOrEqual(100);
  });

  it("rejects missing consent and invalid data sensitivity before database writes", async () => {
    expect(
      diagnosticSchema.safeParse({ ...diagnosticInput, consent: false }).success,
    ).toBe(false);
    expect(
      diagnosticSchema.safeParse({
        ...diagnosticInput,
        dataSensitivity: "secret métier non cadré",
      }).success,
    ).toBe(false);
    expect(await prisma.lead.count()).toBe(0);
    expect(await prisma.diagnosticRequest.count()).toBe(0);
  });
});
