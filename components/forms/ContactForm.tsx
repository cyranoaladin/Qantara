"use client";

import { useActionState } from "react";

import { submitContact } from "@/lib/actions/contact";
import { initialActionState } from "@/lib/actions/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ActionMessage, FieldError, SubmitButton } from "./FormStatus";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialActionState);

  return (
    <form action={formAction} className="surface grid gap-5 rounded-xl p-6 md:p-8">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="honeypot"
        tabIndex={-1}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Nom"
          name="name"
          required
          placeholder="Votre nom complet"
          errors={state.errors?.name}
        />
        <Field
          label="Email"
          name="email"
          required
          type="email"
          placeholder="nom@organisation.com"
          errors={state.errors?.email}
        />
        <Field
          label="Téléphone"
          name="phone"
          placeholder="+216 XX XXX XXX"
          errors={state.errors?.phone}
        />
        <Field
          label="Organisation"
          name="organization"
          placeholder="Nom de l'entreprise ou établissement"
          errors={state.errors?.organization}
        />
        <Field
          label="Rôle"
          name="role"
          placeholder="Directeur, enseignant, DSI..."
          errors={state.errors?.role}
        />
        <Field
          label="Sujet"
          name="subject"
          required
          placeholder="Formation IA, audit, prototype..."
          errors={state.errors?.subject}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="contact-message">
          Message <span className="text-primary">*</span>
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Décrivez votre contexte, vos besoins et les objectifs que vous souhaitez atteindre..."
          rows={5}
        />
        <FieldError errors={state.errors?.message} />
      </div>

      <label className="flex gap-3 text-sm leading-6 text-muted-foreground">
        <Checkbox name="consent" required />
        <span>
          J'accepte que Qantara AI utilise ces informations uniquement pour traiter ma
          demande.
        </span>
      </label>
      <FieldError errors={state.errors?.consent} />

      <ActionMessage message={state.message} status={state.status} />
      <SubmitButton>Envoyer le message</SubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  errors?: string[];
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={`contact-${name}`}>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <Input
        id={`contact-${name}`}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
      />
      <FieldError errors={errors} />
    </div>
  );
}
