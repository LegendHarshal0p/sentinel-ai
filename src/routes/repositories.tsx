import { createFileRoute } from "@tanstack/react-router";
import { GitBranch, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { EmptyState, SectionCard, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { repositories } from "@/lib/mock-data";

export const Route = createFileRoute("/repositories")({
  head: () => ({
    meta: [
      { title: "Repositories — SentinelAI" },
      {
        name: "description",
        content: "Connect GitHub repositories and review per-repository health, SBOM freshness and open vulnerabilities.",
      },
      { property: "og:title", content: "Repositories — SentinelAI" },
      { property: "og:description", content: "Repository health and SBOM freshness across your GitHub organization." },
    ],
  }),
  component: RepositoriesPage,
});

function RepositoriesPage() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const [lang, setLang] = useState("all");

  const languages = useMemo(() => [...new Set(repositories.map((r) => r.language))], []);

  const rows = repositories.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
    const matchesLang = lang === "all" || r.language === lang;
    const matchesRisk =
      risk === "all" ||
      (risk === "critical" && r.critical > 0) ||
      (risk === "healthy" && r.critical === 0 && r.score >= 80) ||
      (risk === "attention" && r.critical === 0 && r.score < 80);
    return matchesQuery && matchesLang && matchesRisk;
  });

  return (
    <AppShell
      title="Repositories"
      description="Every connected repository, continuously scanned for provenance and vulnerable dependencies."
      actions={
        <Button className="gap-2 rounded-xl">
          <Plus className="size-4" /> Connect repository
        </Button>
      }
    >
      <SectionCard title={`${rows.length} repositories`} description="Search and filter your connected estate.">
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories"
              className="h-10 rounded-xl pl-9"
              aria-label="Search repositories"
            />
          </div>
          <Select value={risk} onValueChange={setRisk}>
            <SelectTrigger className="h-10 w-[170px] rounded-xl"><SelectValue placeholder="Risk" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk levels</SelectItem>
              <SelectItem value="critical">Has critical</SelectItem>
              <SelectItem value="attention">Needs attention</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="h-10 w-[160px] rounded-xl"><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {languages.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            icon={GitBranch}
            title="No matching repositories"
            description="Try a different search term or clear the filters to see your full estate."
            action={
              <Button variant="outline" className="rounded-xl" onClick={() => { setQuery(""); setRisk("all"); setLang("all"); }}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2.5 font-medium">Repository</th>
                  <th className="py-2.5 font-medium">Health</th>
                  <th className="py-2.5 font-medium">Findings</th>
                  <th className="py-2.5 font-medium">Dependencies</th>
                  <th className="py-2.5 font-medium">SBOM</th>
                  <th className="py-2.5 font-medium">Last scan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-muted/40">
                    <td className="py-3.5">
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.language} · {r.visibility}</p>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <Progress value={r.score} className="h-1.5 w-20" />
                        <span className="text-sm font-semibold tabular-nums">{r.score}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {r.critical > 0 ? <StatusPill tone="critical">{r.critical} critical</StatusPill> : <StatusPill tone="healthy">0 critical</StatusPill>}
                        <StatusPill tone="warning">{r.high} high</StatusPill>
                      </div>
                    </td>
                    <td className="py-3.5 tabular-nums">{r.deps.toLocaleString()}</td>
                    <td className="py-3.5">
                      <StatusPill tone={r.sbom === "current" ? "healthy" : r.sbom === "stale" ? "warning" : "neutral"}>
                        {r.sbom}
                      </StatusPill>
                    </td>
                    <td className="py-3.5 text-muted-foreground">{r.lastScan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </AppShell>
  );
}
