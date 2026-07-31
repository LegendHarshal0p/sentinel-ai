import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Crown,
  Package,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/admin/deliveries")({
  component: AdminDeliveriesPage,
});

function AdminDeliveriesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Crown className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[15px] font-semibold">Super Admin</p>
            <p className="text-[11px] text-muted-foreground">SentinelAI Control</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          <Link
            to="/admin"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          >
            <ChevronLeft className="size-[18px]" />
            Dashboard
          </Link>
          <Link
            to="/admin/deliveries"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-card)]"
          >
            <Package className="size-[18px] text-primary" />
            Deliveries
          </Link>
        </nav>
      </aside>

      <div className="pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-6 py-4">
            <h1 className="font-display text-xl font-semibold">Delivery Management</h1>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="text-center py-16">
            <Truck className="mx-auto size-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Delivery Tracking</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time delivery monitoring will be available once deliveries are created.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}