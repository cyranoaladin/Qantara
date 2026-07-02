import { OfferCard } from "@/components/cards/OfferCard";
import { offers } from "@/lib/data/offers";

import { SectionHeader } from "./SectionHeader";

export function OffersSection() {
  return (
    <section className="section-padding border-y border-border bg-card/24" id="offres">
      <div className="container-shell">
        <SectionHeader
          badge="Offres de départ"
          title="Des formats conçus pour réduire l'incertitude avant d'investir davantage."
          description="Formation pour aligner, audit pour arbitrer, prototype pour tester, gouvernance pour sécuriser. Les prix se cadrent selon périmètre, données et niveau d'accompagnement."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.name} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
