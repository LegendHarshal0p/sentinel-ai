import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Crown,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShieldAlert,
  Truck,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, type UserProfile } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalCustomers: 0,
    activeDeliveries: 0,
  });

  useEffect(() => {
    if (!isAdmin && !loading) {
      navigate({ to: "/auth/login" });
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data as UserProfile[]);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: totalDrivers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "driver");

    const { count: totalCustomers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer");

    setStats({
      totalUsers: totalUsers || 0,
      totalDrivers: totalDrivers || 0,
      totalCustomers: totalCustomers || 0,
      activeDeliveries: 0,
    });
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: !currentStatus })
      .eq("id", userId);

    if (!error) {
      fetchUsers();
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (!error) {
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Sidebar */}
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
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-card)]"
          >
            <LayoutDashboard className="size-[18px] text-primary" />
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          >
            <Users className="size-[18px]" />
            User Management
          </Link>
          <Link
            to="/admin/drivers"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          >
            <Truck className="size-[18px]" />
            Driver Management
          </Link>
          <Link
            to="/admin/deliveries"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          >
            <Package className="size-[18px]" />
            Deliveries
          </Link>
          <Link
            to="/admin/settings"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
          >
            <Settings className="size-[18px]" />
            Settings
          </Link>
        </nav>

        <div className="m-3 rounded-2xl border border-sidebar-border bg-card p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Logged in as
          </p>
          <p className="mt-1 text-sm font-semibold">{profile?.full_name || "Admin"}</p>
          <p className="text-xs text-muted-foreground">{profile?.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-6 py-4">
            <h1 className="font-display text-xl font-semibold">Admin Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => navigate({ to: "/" })}
              >
                View Main App
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-8">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Users className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-info/12 text-info">
                  <Truck className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{stats.totalDrivers}</p>
                  <p className="text-xs text-muted-foreground">Drivers</p>
                </div>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-ai/12 text-ai">
                  <User className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-healthy/12 text-healthy">
                  <Package className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{stats.activeDeliveries}</p>
                  <p className="text-xs text-muted-foreground">Active Deliveries</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Recent Users</h2>
              <div className="relative w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-xl pl-9"
                />
              </div>
            </div>

            <div className="card-surface rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No users found. Users will appear here once they sign up.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.slice(0, 10).map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium">{user.full_name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            user.role === "admin"
                              ? "bg-primary/12 text-primary"
                              : user.role === "driver"
                              ? "bg-info/12 text-info"
                              : "bg-ai/12 text-ai"
                          }`}>
                            {user.role === "admin" && <Crown className="size-3" />}
                            {user.role === "driver" && <Truck className="size-3" />}
                            {user.role === "customer" && <User className="size-3" />}
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-xs">
                            <CheckCircle2 className="size-3 text-healthy" />
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => updateUserRole(user.id, user.role === "driver" ? "customer" : "driver")}
                            >
                              Switch Role
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-destructive hover:text-destructive"
                              onClick={() => toggleUserStatus(user.id, true)}
                            >
                              <Ban className="size-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="size-5 text-warning" />
                <p className="text-sm font-semibold">Pending Approvals</p>
              </div>
              <p className="text-xs text-muted-foreground">Review new driver registrations and verify documents.</p>
              <Button variant="outline" size="sm" className="mt-3 rounded-xl w-full">
                Review
              </Button>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="size-5 text-critical" />
                <p className="text-sm font-semibold">Security Alerts</p>
              </div>
              <p className="text-xs text-muted-foreground">Monitor suspicious activities and failed login attempts.</p>
              <Button variant="outline" size="sm" className="mt-3 rounded-xl w-full">
                View Alerts
              </Button>
            </div>

            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="size-5 text-info" />
                <p className="text-sm font-semibold">System Config</p>
              </div>
              <p className="text-xs text-muted-foreground">Manage application settings and feature flags.</p>
              <Button variant="outline" size="sm" className="mt-3 rounded-xl w-full">
                Configure
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}