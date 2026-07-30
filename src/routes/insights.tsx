import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { SectionCard, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — SentinelAI" },
      {
        name: "description",
        content: "AI-generated risk predictions, vulnerability explanations and recommended remediation actions for your dependency graph.",
      },
      { property: "og:title", content: "AI Insights — SentinelAI" },
      { property: "og:description", content: "Risk prediction and recommended actions generated from your dependency graph." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <AppShell
      title="AI insights"
      description="Model-generated analysis of exposure, change impact and the cheapest path to a lower risk score."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {aiInsights.map((insight, i) => (
          <SectionCard
            key={insight.id}
            title={insight.kind}
            className="border-ai/25"
            action={<StatusPill tone="ai">{Math.round(insight.confidence * 100)}% confidence</StatusPill>}
          >
            <div style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-center gap-2 text-ai">
                <Sparkles className="size-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wide">Generated insight</span>
              </div>
              <p className="mt-2 font-display text-[15px] font-semibold leading-snug">{insight.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{insight.body}</p>
              <div className="mt-4 rounded-xl bg-ai/6 p-3 ring-1 ring-ai/15">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">Recommended action</p>
                <p className="mt-1 text-sm">{insight.action}</p>
              </div>
              <Progress value={insight.confidence * 100} className="mt-4 h-1.5" />
              <Button variant="ghost" className="mt-3 w-full justify-between">
                Apply recommendation <ArrowRight className="size-4" />
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>

      <SectionCard className="mt-4" title="Ask SentinelAI" description="Natural-language questions over your supply chain graph.">
        <div className="space-y-2">
          {[
            "Which repositories would still be exposed if we patched http-kit today?",
            "Explain CVE-2026-3391 for a non-security audience.",
            "What is the smallest set of upgrades that removes all KEV-listed findings?",
          ].map((q) => (
            <button
              key={q}
              className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:border-ai/40 hover:bg-ai/5"
            >
              {q}
              <ArrowRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
