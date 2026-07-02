"use client";

import { useActionState } from "react";

import { submitDiagnostic } from "@/lib/actions/diagnostic";
import { initialActionState } from "@/lib/actions/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  dataSensitivityOptions,
  organizationTypeOptions,
  timelineOptions,
} from "@/lib/validators/diagnostic.schema";

import { ActionMessage, FieldError, SubmitButton } from "./FormStatus";

const teamSizes = ["1-5", "6-20", "21-50", "51-200", "200+"] as const;
const sectors = [
  "Éducation",
  "Services",
  "Comptabilité",
  "Juridique",
  "Tourisme & hôtellerie",
  "Formation",
  "Association / ONG",
  "Industrie",
  "Ressources humaines",
  "Marketing & communication",
  "Autre",
] as const;
const budgetRanges = [
  "À définir",
  "Moins de 2 000 €",
  "2 000 - 5 000 €",
  "5 000 - 15 000 €",
  "Plus de 15 000 €",
] as const;

export function DiagnosticForm() {
  const [state, formAction] = useActionState(submitDiagnostic, initialActionState);

  return (
    <form action={formAction} className="surface grid gap-6 rounded-lg p-6">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="honeypot"
        tabIndex={-1}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom" name="name" required errors={state.errors?.name} />
        <Field
          label="Email"
          name="email"
          required
          type="email"
          errors={state.errors?.email}
        />
        <Field label="Téléphone" name="phone" errors={state.errors?.phone} />
        <Field
          label="Organisation"
          name="organization"
          required
          errors={state.errors?.organization}
        />
        <SelectField
          errors={state.errors?.organizationType}
          label="Type d'organisation"
          name="organizationType"
          options={organizationTypeOptions}
          required
        />
        <SelectField
          errors={state.errors?.sector}
          label="Secteur"
          name="sector"
          options={sectors}
          required
        />
        <SelectField
          errors={state.errors?.teamSize}
          label="Taille de l'équipe"
          name="teamSize"
          options={teamSizes}
          required
        />
        <SelectField
          errors={state.errors?.timeline}
          label="Calendrier"
          name="timeline"
          options={timelineOptions}
          required
        />
      </div>

      <TextAreaField
        errors={state.errors?.currentTools}
        label="Outils IA déjà utilisés"
        name="currentTools"
        placeholder="ChatGPT, Microsoft Copilot, Notion AI, Make, n8n..."
      />
      <TextAreaField
        errors={state.errors?.mainPain}
        label="Problème principal"
        name="mainPain"
        required
        placeholder="Décrivez le point de friction métier le plus important."
      />
      <TextAreaField
        errors={state.errors?.targetUseCases}
        label="Cas d'usage IA visés"
        name="targetUseCases"
        required
        placeholder="Assistant documentaire, reporting, préparation de cours, support client..."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          errors={state.errors?.dataSensitivity}
          label="Sensibilité des données"
          name="dataSensitivity"
          options={dataSensitivityOptions}
          required
        />
        <SelectField
          errors={state.errors?.budgetRange}
          label="Budget indicatif"
          name="budgetRange"
          options={budgetRanges}
        />
      </div>

      <TextAreaField
        errors={state.errors?.message}
        label="Message complémentaire"
        name="message"
      />

      <label className="flex gap-3 text-sm leading-6 text-muted-foreground">
        <Checkbox name="consent" required />
        <span>
          J'accepte que Qantara AI traite ces informations pour analyser ma demande et me
          recontacter.
        </span>
      </label>
      <FieldError errors={state.errors?.consent} />

      <ActionMessage message={state.message} status={state.status} />
      <SubmitButton>Envoyer la demande de diagnostic</SubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={`diagnostic-${name}`}>
        {label}
      </label>
      <Input id={`diagnostic-${name}`} name={name} required={required} type={type} />
      <FieldError errors={errors} />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
  errors,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={`diagnostic-${name}`}>
        {label}
      </label>
      <Select
        id={`diagnostic-${name}`}
        name={name}
        options={options}
        placeholder="Sélectionner"
        required={required}
      />
      <FieldError errors={errors} />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  required,
  placeholder,
  errors,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  errors?: string[];
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={`diagnostic-${name}`}>
        {label}
      </label>
      <Textarea
        id={`diagnostic-${name}`}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      <FieldError errors={errors} />
    </div>
  );
}
