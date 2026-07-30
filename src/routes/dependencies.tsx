import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Search } from "lucide-react";
import { useState } from "react";

import { GraphPanel } from "@/components/graph/graph-panel";
import { AppShell } from "@/components/layout/app-shell";
import { EmptyState, SectionCard, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { packages, type PackageNode } from "@/lib/mock-data";

export const Route = createFileRoute("/dependencies")({
  head: () => ({
    meta: [
      { title: "Dependency Explorer — SentinelAI" },
      {
        name: "description",
        content: "Explore direct and transitive dependencies as an interactive graph, with licenses, dependents and risk status.",
      },
      { property: "og:title", content: "Dependency Explorer — SentinelAI" },
      { property: "og:description", content: "Interactive dependency graph across every ecosystem in your estate." },
    ],
  }),
  component: DependenciesPage,
});

function DependenciesPage() {
  const [query, setQuery] = useState("");
  const [eco, setEco] = useState("all");
  const [selected, setSelected] = useState<PackageNode | null>(packages[0]);

  const rows = packages.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) && (eco === "all" || p.ecosystem === eco),
  );

  return (
    <AppShell
      title="Dependency explorer"
      description="12,480 components resolved across npm, PyPI, Maven, Go and Cargo."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Dependency graph" description="Click a node to inspect the package.">
          <GraphPanel />
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Packages">
            <div className="mb-3 space-y-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search packages"
                  className="h-10 rounded-xl pl-9"
                  aria-label="Search packages"
                />
              </div>
              <Select value={eco} onValueChange={setEco}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ecosystems</SelectItem>
                  {[...new Set(packages.map((p) => p.ecosystem))].map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {rows.length === 0 ? (
              <EmptyState
                icon={Boxes}
                title="No packages found"
                description="No component in this workspace matches your search."
                action={<Button variant="outline" className="rounded-xl" onClick={() => { setQuery(""); setEco("all"); }}>Reset</Button>}
              />
            ) : (
              <ul className="max-h-[300px] space-y-1 overflow-y-auto pr-1">
                {rows.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => setSelected(p)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${selected?.id === p.id ? "bg-primary/10 ring-1 ring-primary/25" : "hover:bg-muted/60"}`}
                    >
                      <p className="truncate font-mono text-[13px] font-medium">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {p.version} · {p.ecosystem} · {p.direct ? "direct" : "transitive"}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          {selected && (
            <SectionCard title="Node details">
              <p className="font-mono text-sm font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground">version {selected.version}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <StatusPill tone={selected.status === "healthy" ? "healthy" : selected.status === "warning" ? "warning" : "critical"}>
                  {selected.status}
                </StatusPill>
                <StatusPill tone="info">{selected.ecosystem}</StatusPill>
                <StatusPill tone="neutral">{selected.license}</StatusPill>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Dependents</dt><dd className="font-medium">{selected.dependents}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Resolution</dt><dd className="font-medium">{selected.direct ? "Direct" : "Transitive"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">In SBOMs</dt><dd className="font-medium">{selected.dependents + 2}</dd></div>
              </dl>
            </SectionCard>
          )}
        </div>
      </div>
    </AppShell>
  );
}
