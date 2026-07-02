import { logoutAdmin } from "@/app/admin/actions";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export async function AdminDashboard() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <Card>
        <h1 className="text-2xl font-semibold">Admin Qantara AI</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Impossible de charger les données admin. Vérifiez `DATABASE_URL`, exécutez `pnpm
          prisma generate`, puis appliquez la migration Prisma.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Admin Qantara AI</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Vue minimale des leads et demandes entrantes.
          </p>
        </div>
        <form action={logoutAdmin}>
          <Button type="submit" variant="secondary">
            Déconnexion
          </Button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Leads" value={data.leadCount} />
        <Metric title="Contacts" value={data.contactCount} />
        <Metric title="Diagnostics" value={data.diagnosticCount} />
        <Metric title="Newsletter" value={data.newsletterCount} />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Derniers leads</h2>
        <LeadsTable leads={data.latestLeads} />
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <LatestList
          items={data.latestContacts.map((item) => ({
            id: item.id,
            title: item.subject,
            detail: `${item.name} · ${item.email}`,
            date: item.createdAt,
          }))}
          title="Derniers contacts"
        />
        <LatestList
          items={data.latestDiagnostics.map((item) => ({
            id: item.id,
            title: item.organization,
            detail: `${item.name} · score ${item.maturityScore ?? "—"}/100`,
            date: item.createdAt,
          }))}
          title="Derniers diagnostics"
        />
        <LatestList
          items={data.latestSubscribers.map((item) => ({
            id: item.id,
            title: item.firstName,
            detail: item.email,
            date: item.createdAt,
          }))}
          title="Derniers inscrits"
        />
      </div>
    </div>
  );
}

async function getDashboardData() {
  try {
    const [
      leadCount,
      contactCount,
      diagnosticCount,
      newsletterCount,
      latestLeads,
      latestContacts,
      latestDiagnostics,
      latestSubscribers,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.contactMessage.count(),
      prisma.diagnosticRequest.count(),
      prisma.newsletterSubscriber.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          createdAt: true,
          name: true,
          email: true,
          organization: true,
          source: true,
          status: true,
          sector: true,
          timeline: true,
        },
        take: 12,
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, createdAt: true, name: true, email: true, subject: true },
        take: 5,
      }),
      prisma.diagnosticRequest.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          createdAt: true,
          name: true,
          email: true,
          organization: true,
          maturityScore: true,
        },
        take: 5,
      }),
      prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, createdAt: true, firstName: true, email: true },
        take: 5,
      }),
    ]);

    return {
      leadCount,
      contactCount,
      diagnosticCount,
      newsletterCount,
      latestLeads,
      latestContacts,
      latestDiagnostics,
      latestSubscribers,
    };
  } catch {
    return null;
  }
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </Card>
  );
}

function LatestList({
  title,
  items,
}: {
  title: string;
  items: { id: string; title: string; detail: string; date: Date }[];
}) {
  return (
    <Card>
      <h2 className="text-lg font-semibold">{title}</h2>
      {items.length ? (
        <ul className="mt-5 grid gap-4">
          {items.map((item) => (
            <li
              className="border-t border-border pt-4 first:border-t-0 first:pt-0"
              key={item.id}
            >
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              <p className="mt-1 text-xs text-muted">
                {item.date.toLocaleDateString("fr-FR")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">Aucune entrée.</p>
      )}
    </Card>
  );
}
