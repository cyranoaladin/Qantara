"use client";

import { useActionState } from "react";

import { submitNewsletter } from "@/lib/actions/newsletter";
import { initialActionState } from "@/lib/actions/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { ActionMessage, FieldError, SubmitButton } from "./FormStatus";

const organizationTypes = [
  "PME",
  "Établissement scolaire",
  "Université",
  "Cabinet professionnel",
  "Association / ONG",
  "Institution",
  "Indépendant",
  "Autre",
] as const;

export function NewsletterForm() {
  const [state, formAction] = useActionState(submitNewsletter, initialActionState);

  return (
    <form action={formAction} className="surface grid gap-5 rounded-lg p-6">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="honeypot"
        tabIndex={-1}
      />

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="newsletter-firstName">
          Prénom
        </label>
        <Input id="newsletter-firstName" name="firstName" required />
        <FieldError errors={state.errors?.firstName} />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="newsletter-email">
          Email professionnel
        </label>
        <Input id="newsletter-email" name="email" required type="email" />
        <FieldError errors={state.errors?.email} />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="newsletter-organization">
            Organisation
          </label>
          <Input id="newsletter-organization" name="organization" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="newsletter-organizationType">
            Type d'organisation
          </label>
          <Select
            id="newsletter-organizationType"
            name="organizationType"
            options={organizationTypes}
            placeholder="Sélectionner"
          />
        </div>
      </div>

      <label className="flex gap-3 text-sm leading-6 text-muted-foreground">
        <Checkbox name="consent" required />
        <span>
          J'accepte que Qantara AI utilise ces informations pour traiter ma demande et
          m'envoyer la ressource demandée.
        </span>
      </label>
      <FieldError errors={state.errors?.consent} />

      <ActionMessage message={state.message} status={state.status} />
      <SubmitButton>Recevoir la checklist</SubmitButton>
    </form>
  );
}
