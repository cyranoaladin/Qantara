import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FounderSection } from "@/components/sections/FounderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SectorsSection } from "@/components/sections/SectorsSection";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { TrustBar } from "@/components/sections/TrustBar";
import { faqs } from "@/lib/data/faqs";
import { faqPageJsonLd } from "@/lib/seo";

export default function Home() {
  const faqJsonLd = faqPageJsonLd(faqs);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replaceAll("<", "\\u003c"),
        }}
        type="application/ld+json"
      />
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <MethodSection />
      <ServicePillars />
      <OffersSection />
      <SectorsSection />
      <FounderSection />
      <LeadMagnetSection />
      <CaseStudiesSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
