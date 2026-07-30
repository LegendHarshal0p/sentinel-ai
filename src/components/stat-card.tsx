import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  suffix,
  delta,
  icon: Icon,
  tone = "primary",
  goodDown = false,
  index = 0,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  delta?: number;
  icon: LucideIcon;
  tone?: "primary" | "critical" | "healthy" | "info" | "ai";
  goodDown?: boolean;
  index?: number;
}) {
  const toneClass = {
    primary: "bg-primary/12 text-primary",
    critical: "bg-critical/12 text-critical",
    healthy: "bg-healthy/12 text-healthy",
    info: "bg-info/12 text-info",
    ai: "bg-ai/12 text-ai",
  }[tone];

  const positive = delta === undefined ? true : goodDown ? delta < 0 : delta > 0;

  return (
    <div
      className="card-surface animate-[var(--animate-fade-up)] p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid size-9 place-items-center rounded-xl", toneClass)}>
          <Icon className="size-[18px]" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight">
        {value}
        {suffix && <span className="ml-0.5 text-lg text-muted-foreground">{suffix}</span>}
      </p>
      {delta !== undefined && (
        <p
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-healthy" : "text-critical",
          )}
        >
          {delta > 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
          {Math.abs(delta)}
          {suffix === "%" ? " pts" : ""} <span className="text-muted-foreground">vs last month</span>
        </p>
      )}
    </div>
  );
}
