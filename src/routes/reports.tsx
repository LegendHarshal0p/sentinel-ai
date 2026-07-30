import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/app-shell";
import { SectionCard } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { dependencyGrowth, heatmap, repositories, trend } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Analytics & Reports — SentinelAI" },
      {
        name: "description",
        content: "Security trends, dependency growth, repository health and a weekly risk heatmap across the organization.",
      },
      { property: "og:title", content: "Analytics & Reports — SentinelAI" },
      { property: "og:description", content: "Security trends, dependency growth and risk heatmaps." },
    ],
  }),
  component: ReportsPage,
});

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: 12,
};

const heatTone = ["bg-muted", "bg-healthy/30", "bg-high/35", "bg-high/60", "bg-critical/55", "bg-critical/85"];
const weeks = ["W22", "W23", "W24", "W25", "W26", "W27", "W28"];

function ReportsPage() {
  return (
    <AppShell
      title="Analytics"
      description="Trends, growth and exposure across the last six months."
      actions={
        <Button variant="outline" className="gap-2 rounded-xl">
          <Download className="size-4" /> Monthly report
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Findings by month" description="Critical vs. high severity.">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="critical" name="Critical" fill="var(--critical)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="high" name="High" fill="var(--high)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Dependency growth" description="Direct vs. transitive components.">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dependencyGrowth} margin={{ left: -10, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="direct" name="Direct" stackId="a" fill="var(--primary)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="transitive" name="Transitive" stackId="a" fill="var(--info)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Risk heatmap" description="Weekly critical exposure per repository.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-1 text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="w-32 text-left font-medium">Repository</th>
                  {weeks.map((w) => (
                    <th key={w} className="font-medium">{w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmap.map((row) => (
                  <tr key={row.repo}>
                    <td className="pr-2 text-left font-medium">{row.repo}</td>
                    {row.cells.map((c, i) => (
                      <td key={i}>
                        <div
                          className={`h-8 rounded-lg ${heatTone[c]} transition-transform hover:scale-105`}
                          title={`${row.repo} · ${weeks[i]} · ${c} critical`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Repository health" description="Top scores this month.">
          <ul className="space-y-3">
            {[...repositories].sort((a, b) => b.score - a.score).slice(0, 6).map((r) => (
              <li key={r.id}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="truncate text-muted-foreground">{r.name.split("/")[1]}</span>
                  <span className="font-medium tabular-nums">{r.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${r.score}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}
