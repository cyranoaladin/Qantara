import { describe, expect, it } from "vitest";

import { offers } from "@/lib/data/offers";
import { sectors } from "@/lib/data/sectors";
import { services } from "@/lib/data/services";

const forbiddenClaims = [
  "nos clients",
  "certifié",
  "leader du marché",
  "garanti",
  "référence client",
] as const;

describe("product content", () => {
  it("gives every service a business outcome and a risk handled", () => {
    for (const service of services) {
      expect(service.businessOutcome.length).toBeGreaterThan(35);
      expect(service.riskHandled.length).toBeGreaterThan(30);
      expect(service.engagement.length).toBeGreaterThan(20);
    }
  });

  it("frames every offer with scope, fit and decision outputs", () => {
    for (const offer of offers) {
      expect(offer.scope.length).toBeGreaterThan(20);
      expect(offer.bestFor.length).toBeGreaterThan(20);
      expect(offer.decisionOutputs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("connects each sector to a business issue and a measurable indicator", () => {
    for (const sector of sectors) {
      expect(sector.priority.length).toBeGreaterThan(20);
      expect(sector.metric.length).toBeGreaterThan(12);
      expect(sector.guardrail.length).toBeGreaterThan(15);
    }
  });

  it("does not introduce unsupported marketing claims", () => {
    const haystack = JSON.stringify({ services, offers, sectors }).toLowerCase();

    for (const claim of forbiddenClaims) {
      expect(haystack).not.toContain(claim);
    }
  });
});
