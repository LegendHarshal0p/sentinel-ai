import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  FileCode2,
  GitBranch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/app-shell";
import { EmptyState, ScoreRing, SectionCard, SeverityBadge, StatusPill } from "@/components/primitives";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiInsights, ecosystemSplit, kpis, repositories, trend, vulnerabilities } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Security Dashboard — SentinelAI" },
      {
        name: "description",
        content:
          "Live security score, critical vulnerabilities, SBOM coverage and auto-remediation rate across your open-source software supply chain.",
      },
      { property: "og:title", content: "Security Dashboard — SentinelAI" },
      {
        property: "og:description",
        content: "Continuous provenance and blast-radius remediation for your software supply chain.",
      },
    ],
  }),
  component: Dashboard,
});

const chartColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: 12,
};

function Dashboard() {
  const topRepos = [...repositories].sort((a, b) => a.score - b.score).slice(0, 5);

  return (
    <AppShell
      title="Security overview"
      description="Continuous provenance across 46 repositories and 12,480 dependencies."
      actions={
        <>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/sbom">Generate SBOM</Link>
          </Button>
          <Button className="rounded-xl" asChild>
            <Link to="/remediation">Run remediation</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard index={0} label="Security score" value={kpis.securityScore} delta={kpis.securityScoreDelta} icon={ShieldCheck} tone="healthy" />
        <StatCard index={1} label="Critical vulnerabilities" value={kpis.criticalVulns} delta={kpis.criticalVulnsDelta} icon={ShieldAlert} tone="critical" goodDown />
        <StatCard index={2} label="Active repositories" value={kpis.repositories} delta={kpis.repositoriesDelta} icon={GitBranch} tone="info" />
        <StatCard index={3} label="Dependencies tracked" value={kpis.dependencies.toLocaleString()} delta={kpis.dependenciesDelta} icon={Boxes} tone="primary" />
        <StatCard index={4} label="SBOM coverage" value={kpis.sbomCoverage} suffix="%" delta={kpis.sbomCoverageDelta} icon={FileCode2} tone="ai" />
        <StatCard index={5} label="Auto-remediation rate" value={kpis.autoRemediationRate} suffix="%" delta={kpis.autoRemediationRateDelta} icon={Wrench} tone="healthy" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Vulnerability trend"
          description="Open critical and high findings vs. remediated over the last six months."
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gCrit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--critical)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--critical)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--healthy)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--healthy)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="critical" name="Critical" stroke="var(--critical)" fill="url(#gCrit)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" name="Remediated" stroke="var(--healthy)" fill="url(#gRes)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Posture" description="Composite of provenance, patch latency and exposure.">
          <div className="flex flex-col items-center gap-5">
            <ScoreRing score={kpis.securityScore} />
            <div className="w-full space-y-3">
              {[
                { label: "SBOM coverage", value: kpis.sbomCoverage },
                { label: "Patch SLA adherence", value: 76 },
                { label: "Signed attestations", value: 68 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.value}%</span>
                  </div>
                  <Progress value={row.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Highest-risk repositories"
          description="Sorted by lowest security score."
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/repositories">View all</Link>
            </Button>
          }
        >
          {topRepos.length === 0 ? (
            <EmptyState icon={GitBranch} title="No repositories connected" description="Connect a GitHub organization to start scanning." />
          ) : (
            <ul className="divide-y divide-border">
              {topRepos.map((repo) => (
                <li key={repo.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{repo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {repo.language} · {repo.deps.toLocaleString()} dependencies · scanned {repo.lastScan}
                    </p>
                  </div>
                  {repo.critical > 0 && <StatusPill tone="critical">{repo.critical} critical</StatusPill>}
                  <StatusPill tone="warning">{repo.high} high</StatusPill>
                  <div className="w-24">
                    <Progress value={repo.score} className="h-1.5" />
                  </div>
                  <span className="w-8 text-right text-sm font-semibold tabular-nums">{repo.score}</span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Dependencies by ecosystem">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ecosystemSplit} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={3} stroke="none">
                  {ecosystemSplit.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Latest critical findings"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/vulnerabilities">Vulnerability center</Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {vulnerabilities.slice(0, 4).map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-3 py-3">
                <SeverityBadge severity={v.severity} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{v.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {v.cve} · {v.pkg}@{v.version} → {v.fixed}
                  </p>
                </div>
                {v.exploited && <StatusPill tone="critical">Exploited in the wild</StatusPill>}
                <span className="text-sm font-semibold tabular-nums">{v.cvss}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="AI insights" description="Generated from your dependency graph." >
          <ul className="space-y-3">
            {aiInsights.slice(0, 2).map((insight) => (
              <li key={insight.id} className="rounded-xl border border-ai/20 bg-ai/5 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-ai" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-ai">{insight.kind}</span>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">{insight.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{insight.body}</p>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-3 w-full rounded-xl" asChild>
            <Link to="/insights">Open AI insights</Link>
          </Button>
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="Security score momentum">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[50, 100]} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" name="Score" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </AppShell>
  );
}
