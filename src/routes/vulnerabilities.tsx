import { createFileRoute } from "@tanstack/react-router";
import { Flame, Search, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { EmptyState, SectionCard, SeverityBadge, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vulnerabilities } from "@/lib/mock-data";

export const Route = createFileRoute("/vulnerabilities")({
  head: () => ({
    meta: [
      { title: "Vulnerability Center — SentinelAI" },
      {
        name: "description",
        content: "Triage CVEs by severity, CVSS, affected package and repository with exploit intelligence and fix versions.",
      },
      { property: "og:title", content: "Vulnerability Center — SentinelAI" },
      { property: "og:description", content: "CVE triage with exploit intelligence and one-click fix versions." },
    ],
  }),
  component: VulnerabilitiesPage,
});

function VulnerabilitiesPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");
  const [selectedId, setSelectedId] = useState(vulnerabilities[0].id);

  const rows = vulnerabilities.filter(
    (v) =>
      (severity === "all" || v.severity === severity) &&
      (v.cve.toLowerCase().includes(query.toLowerCase()) ||
        v.pkg.toLowerCase().includes(query.toLowerCase()) ||
        v.title.toLowerCase().includes(query.toLowerCase())),
  );

  const selected = vulnerabilities.find((v) => v.id === selectedId)!;

  return (
    <AppShell
      title="Vulnerability center"
      description="14 critical, 46 high and 92 medium findings across the estate."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title={`${rows.length} findings`}>
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search CVE, package or title"
                className="h-10 rounded-xl pl-9"
                aria-label="Search vulnerabilities"
              />
            </div>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="h-10 w-[170px] rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rows.length === 0 ? (
            <EmptyState
              icon={ShieldAlert}
              title="No findings match"
              description="Nothing here — either you're clean, or the filters are too narrow."
              action={<Button variant="outline" className="rounded-xl" onClick={() => { setQuery(""); setSeverity("all"); }}>Clear filters</Button>}
            />
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => setSelectedId(v.id)}
                    className={`flex w-full flex-wrap items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors ${selectedId === v.id ? "bg-primary/8 ring-1 ring-primary/20" : "hover:bg-muted/50"}`}
                  >
                    <SeverityBadge severity={v.severity} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{v.title}</p>
                      <p className="font-mono text-xs text-muted-foreground">{v.cve} · {v.pkg}@{v.version}</p>
                    </div>
                    {v.exploited && <StatusPill tone="critical"><Flame className="size-3" /> Exploited</StatusPill>}
                    <span className="text-sm font-semibold tabular-nums">{v.cvss}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title={selected.cve} description={selected.title}>
            <div className="flex flex-wrap gap-1.5">
              <SeverityBadge severity={selected.severity} />
              <StatusPill tone="info">CVSS {selected.cvss}</StatusPill>
              {selected.exploited && <StatusPill tone="critical">KEV listed</StatusPill>}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{selected.summary}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Package</dt><dd className="font-mono text-xs font-medium">{selected.pkg}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Installed</dt><dd className="font-medium">{selected.version}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Fixed in</dt><dd className="font-medium text-healthy">{selected.fixed}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Published</dt><dd className="font-medium">{selected.published}</dd></div>
            </dl>
            <Button className="mt-4 w-full rounded-xl">Open remediation PR</Button>
          </SectionCard>

          <SectionCard title="Affected repositories">
            <ul className="space-y-2">
              {selected.repos.map((r) => (
                <li key={r} className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm">
                  <span className="truncate">{r}</span>
                  <StatusPill tone="critical">exposed</StatusPill>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
