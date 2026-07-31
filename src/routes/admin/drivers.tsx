import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Crown,
  MapPin,
  Search,
  Star,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, type UserProfile } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/drivers")({
  component: AdminDriversPage,
});

function AdminDriversPage() {
  const { isAdmin } = useAuth();
  const [drivers, setDrivers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "driver")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDrivers(data as UserProfile[]);
    }
    setLoading(false);
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            to="/admin/drivers"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-card)]"
          >
            <Truck className="size-[18px] text-primary" />
            Driver Management
          </Link>
        </nav>
      </aside>

      <div className="pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-6 py-4">
            <h1 className="font-display text-xl font-semibold">Driver Management</h1>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-xl pl-9"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-sm text-muted-foreground">Loading drivers...</div>
          ) : filteredDrivers.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No drivers registered yet</p>
              <p className="text-xs text-muted-foreground">Drivers will appear here once they sign up.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="card-surface rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full bg-info/12 text-info text-lg font-bold">
                      {driver.full_name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{driver.full_name}</p>
                      <p className="text-xs text-muted-foreground">{driver.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>{driver.phone || "No phone"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="size-3 text-warning" />
                      <span>Rating: N/A</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="size-3 text-healthy" />
                      <span className="text-healthy">Active</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                      <XCircle className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}