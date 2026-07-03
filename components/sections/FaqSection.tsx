import { ChevronDown } from "lucide-react";

import { faqs } from "@/lib/data/faqs";

import { SectionHeader } from "./SectionHeader";

export function FaqSection() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <SectionHeader
          badge="Questions fréquentes"
          title="Réponses aux questions les plus posées par nos interlocuteurs."
        />
        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {faqs.map((faq) => (
            <details
              className="faq-item group rounded-xl border border-border bg-white/[0.035] transition-colors hover:border-primary/25 hover:bg-white/[0.05]"
              key={faq.question}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5">
                <span className="text-base font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" />
              </summary>
              <div className="faq-body">
                <div>
                  <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
