import { faqs } from "@/lib/data/faqs";

import { SectionHeader } from "./SectionHeader";

export function FaqSection() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <SectionHeader title="Questions fréquentes" />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <details
              className="rounded-lg border border-border bg-white/[0.035] p-5"
              key={faq.question}
            >
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
