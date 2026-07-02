import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { faqs } from "@/lib/data/faqs";
import { faqPageJsonLd, organizationJsonLd, siteConfig } from "@/lib/seo";

describe("SEO configuration", () => {
  it("defines a valid canonical site URL", () => {
    expect(siteConfig.url).toBeTruthy();
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it("generates Organization and ProfessionalService JSON-LD", () => {
    const jsonLd = organizationJsonLd();

    expect(jsonLd["@type"]).toContain("Organization");
    expect(jsonLd["@type"]).toContain("ProfessionalService");
    expect(jsonLd.name).toBe("Qantara AI");
    expect(jsonLd.address.addressCountry).toBe("TN");
  });

  it("generates FAQPage JSON-LD from local FAQ content", () => {
    const jsonLd = faqPageJsonLd(faqs);

    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(faqs.length);
    expect(jsonLd.mainEntity[0]?.acceptedAnswer["@type"]).toBe("Answer");
  });

  it("includes the main public routes in the sitemap", () => {
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(urls).toContain("/");
    expect(urls).toContain("/services");
    expect(urls).toContain("/formations");
    expect(urls).toContain("/studio");
    expect(urls).toContain("/gouvernance");
    expect(urls).toContain("/education");
    expect(urls).toContain("/diagnostic-ia");
    expect(urls).toContain("/ressources");
    expect(urls).toContain("/blog");
    expect(urls).toContain("/cas-usages");
    expect(urls).toContain("/contact");
  });
});
