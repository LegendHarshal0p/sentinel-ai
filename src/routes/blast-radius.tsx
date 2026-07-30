import { createFileRoute } from "@tanstack/react-router";
import { Layers, Radar, ShieldAlert, Zap } from "lucide-react";

import { GraphPanel } from "@/components/graph/graph-panel";
import { AppShell } from "@/components/layout/app-shell";
import { SectionCard, StatusPill } from "@/components/primitives";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blast-radius")({
  head: () => ({
    meta: [
      { title: "Blast Radius — SentinelAI" },
      {
        name: "description",
        content: "Visualize how a single vulnerable transitive package propagates risk through services, packages and deployments.",
      },
      { property: "og:title", content: "Blast Radius — SentinelAI" },
      { property: "og:description", content: "Animated risk propagation across your dependency graph." },
    ],
  }),
  component: BlastRadiusPage,
});

const propagation = [
  { hop: "Hop 0", label: "lodash.mergewith 4.6.1", detail: "Vulnerable component (CVE-2026-3391)", tone: "critical" as const },
  { hop: "Hop 1", label: "@northwind/http-kit 3.2.1", detail: "Internal package bundling the vulnerable merge helper", tone: "critical" as const },
  { hop: "Hop 2", label: "payments-api · web-console", detail: "2 services import the request pipeline directly", tone: "warning" as const },
  { hop: "Hop 3", label: "checkout · settlement · partner-portal", detail: "3 downstream deployments in production", tone: "warning" as const },
];

function BlastRadiusPage() {
  return (
    <AppShell
      title="Blast radius"
      description="Trace risk propagation from a single component to every deployed service."
      actions={<Button className="gap-2 rounded-xl"><Zap className="size-4" /> Simulate patch</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard index={0} label="Impacted services" value={6} icon={Layers} tone="critical" />
        <StatCard index={1} label="Propagation depth" value={4} suffix=" hops" icon={Radar} tone="primary" />
        <StatCard index={2} label="Exposed endpoints" value={31} icon={ShieldAlert} tone="info" />
        <StatCard index={3} label="Risk removed by patch" value={71} suffix="%" icon={Zap} tone="healthy" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Propagation graph" description="Zoom, pan and follow the animated critical paths.">
          <GraphPanel />
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill tone="critical">Critical path</StatusPill>
            <StatusPill tone="warning">Elevated</StatusPill>
            <StatusPill tone="healthy">Healthy</StatusPill>
            <StatusPill tone="info">Informational</StatusPill>
          </div>
        </SectionCard>

        <SectionCard title="Risk propagation" description="Shortest path from component to production.">
          <ol className="relative space-y-5 pl-6">
            <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border" aria-hidden />
            {propagation.map((step) => (
              <li key={step.hop} className="relative">
                <span
                  className={`absolute -left-6 top-1.5 size-3.5 rounded-full ring-4 ring-card ${step.tone === "critical" ? "bg-critical" : "bg-high"}`}
                />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{step.hop}</p>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </AppShell>
  );
}
