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
    <form action={formAction} className="surface grid gap-5 rounded-lg p-6">
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
          errors={state.errors?.organization}
        />
        <Field label="Rôle" name="role" errors={state.errors?.role} />
        <Field label="Sujet" name="subject" required errors={state.errors?.subject} />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="contact-message">
          Message
        </label>
        <Textarea id="contact-message" name="message" required />
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
      <label className="text-sm font-medium" htmlFor={`contact-${name}`}>
        {label}
      </label>
      <Input id={`contact-${name}`} name={name} required={required} type={type} />
      <FieldError errors={errors} />
    </div>
  );
}
