import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  action,
  className,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("card-surface animate-[var(--animate-fade-up)] p-5", className)}>
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </span>
      <p className="mt-4 font-display text-base font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" | "low" }) {
  const map = {
    critical: "bg-critical/12 text-critical ring-critical/25",
    high: "bg-high/15 text-high ring-high/30",
    medium: "bg-info/12 text-info ring-info/25",
    low: "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1",
        map[severity],
      )}
    >
      {severity}
    </span>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "healthy" | "critical" | "info" | "warning" | "neutral" | "ai";
  children: ReactNode;
}) {
  const map = {
    healthy: "bg-healthy/12 text-healthy ring-healthy/25",
    critical: "bg-critical/12 text-critical ring-critical/25",
    info: "bg-info/12 text-info ring-info/25",
    warning: "bg-high/15 text-high ring-high/30",
    ai: "bg-ai/12 text-ai ring-ai/25",
    neutral: "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ScoreRing({ score, size = 132 }: { score: number; size?: number }) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const stroke = score >= 80 ? "var(--healthy)" : score >= 60 ? "var(--primary)" : "var(--critical)";

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`Security score ${score}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={10} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl font-semibold">{score}</p>
        <p className="text-[11px] text-muted-foreground">/ 100</p>
      </div>
    </div>
  );
}
