import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/ui/card";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Admin | Qantara AI",
  description: "Espace admin protégé Qantara AI.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authenticated = await isAdminAuthenticated();

  return (
    <section className="section-padding">
      <div className="container-shell">
        {authenticated ? <AdminDashboard /> : null}
        {!authenticated && configured ? <AdminLoginForm /> : null}
        {!authenticated && !configured ? (
          <Card className="mx-auto max-w-lg">
            <h1 className="text-2xl font-semibold">Admin non configuré</h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Définissez une variable d'environnement `ADMIN_TOKEN` différente de
              `change-me` pour activer l'accès admin.
            </p>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
