"use client";

import { useActionState } from "react";

import { loginAdmin } from "@/app/admin/actions";
import { ActionMessage, SubmitButton } from "@/components/forms/FormStatus";
import { Input } from "@/components/ui/input";
import { initialActionState } from "@/lib/actions/types";

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialActionState);

  return (
    <form
      action={formAction}
      className="surface mx-auto grid max-w-md gap-5 rounded-lg p-6"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="admin-token">
          Jeton administrateur
        </label>
        <Input
          autoComplete="current-password"
          id="admin-token"
          name="token"
          required
          type="password"
        />
      </div>
      <ActionMessage message={state.message} status={state.status} />
      <SubmitButton>Accéder à l'admin</SubmitButton>
    </form>
  );
}
