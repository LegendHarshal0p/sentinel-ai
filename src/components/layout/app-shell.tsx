import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  Boxes,
  FileCode2,
  GaugeCircle,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Network,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/hooks/use-theme";
import { getSession, signOutDemo } from "@/hooks/use-session";
import { activity, org } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/repositories", label: "Repositories", icon: GitBranch },
  { to: "/dependencies", label: "Dependencies", icon: Boxes },
  { to: "/blast-radius", label: "Blast Radius", icon: Network },
  { to: "/sbom", label: "SBOM Explorer", icon: FileCode2 },
  { to: "/vulnerabilities", label: "Vulnerabilities", icon: ShieldAlert },
  { to: "/remediation", label: "Remediation", icon: Wrench },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
  { to: "/reports", label: "Analytics", icon: GaugeCircle },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const dotByType: Record<string, string> = {
  critical: "bg-critical",
  info: "bg-info",
  ai: "bg-ai",
  healthy: "bg-healthy",
};

export function AppShell({
  children,
  title,
  description,
  actions,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState("MO");
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const session = getSession();
    if (session) setInitials(session.avatarInitials);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <ShieldAlert className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[15px] font-semibold">SentinelAI</p>
            <p className="text-[11px] text-muted-foreground">Provenance Engine</p>
          </div>
          <button
            className="ml-auto rounded-md p-1 text-muted-foreground lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-card)]"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className={cn("size-[18px] transition-transform group-hover:scale-110", active && "text-primary")} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-2xl border border-sidebar-border bg-card p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Organization
          </p>
          <p className="mt-1 text-sm font-semibold">{org.name}</p>
          <p className="text-xs text-muted-foreground">{org.plan} · 46 repos</p>
        </div>
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>

            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search packages, CVEs, repositories…"
                className="h-10 rounded-xl border-border bg-muted/40 pl-9"
                aria-label="Global search"
              />
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
                {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="size-[18px]" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-critical animate-[var(--animate-pulse-ring)]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 rounded-2xl p-0">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <Activity className="size-4 text-primary" />
                    <p className="text-sm font-semibold">Activity feed</p>
                  </div>
                  <ul className="max-h-80 overflow-y-auto p-2">
                    {activity.map((item) => (
                      <li key={item.id} className="flex gap-3 rounded-xl p-2.5 hover:bg-muted/60">
                        <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", dotByType[item.type])} />
                        <div>
                          <p className="text-[13px] leading-snug">{item.title}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="ml-1 grid size-9 place-items-center rounded-full bg-primary/12 text-sm font-semibold text-primary ring-1 ring-primary/20"
                    aria-label="Account menu"
                  >
                    {initials}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 rounded-2xl p-2">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-semibold">Maya Okafor</p>
                    <p className="text-xs text-muted-foreground">Security Lead</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      signOutDemo();
                      navigate({ to: "/login" });
                    }}
                  >
                    <LogOut className="size-4" /> Sign out
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        <main id="main" className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="animate-[var(--animate-fade-up)]">
              <h1 className="font-display text-2xl font-semibold sm:text-[28px]">{title}</h1>
              {description && (
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
