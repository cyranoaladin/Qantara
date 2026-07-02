"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "Envoi en cours..." : children}
    </Button>
  );
}

export function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-2 text-xs text-red-300">{errors[0]}</p>;
}

export function ActionMessage({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message: string;
}) {
  if (!message) return null;

  return (
    <p
      className={
        status === "success"
          ? "rounded-md border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm text-emerald-100"
          : "rounded-md border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-100"
      }
    >
      {message}
    </p>
  );
}
