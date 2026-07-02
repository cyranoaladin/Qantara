type LeadRow = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  organization: string | null;
  source: string;
  status: string;
  sector: string | null;
  timeline: string | null;
};

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (!leads.length) {
    return (
      <div className="rounded-lg border border-border bg-white/[0.035] p-6 text-sm text-muted-foreground">
        Aucun lead enregistré pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-muted">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Organisation</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Secteur</th>
            <th className="px-4 py-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr className="border-t border-border" key={lead.id}>
              <td className="px-4 py-3 text-muted">
                {lead.createdAt.toLocaleDateString("fr-FR")}
              </td>
              <td className="px-4 py-3">
                <span className="block font-medium text-foreground">{lead.name}</span>
                <span className="text-muted">{lead.email}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {lead.organization ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{lead.source}</td>
              <td className="px-4 py-3 text-muted-foreground">{lead.sector ?? "—"}</td>
              <td className="px-4 py-3">
                <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
