import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  Crown,
  Globe,
  Key,
  Mail,
  Settings,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
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
            to="/admin/settings"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-card)]"
          >
            <Settings className="size-[18px] text-primary" />
            Settings
          </Link>
        </nav>
      </aside>

      <div className="pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-6 py-4">
            <h1 className="font-display text-xl font-semibold">System Settings</h1>
          </div>
        </header>

        <main className="mx-auto max-w-[800px] px-6 py-8 space-y-8">
          {/* General Settings */}
          <div className="card-surface rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="size-5 text-primary" />
              <h2 className="text-base font-semibold">General</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Application Name</Label>
                <Input defaultValue="SentinelAI" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@sentinelai.com" className="rounded-xl" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card-surface rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="size-5 text-primary" />
              <h2 className="text-base font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Verification</p>
                  <p className="text-xs text-muted-foreground">Require email verification on signup</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Driver Document Verification</p>
                  <p className="text-xs text-muted-foreground">Require document upload for driver registration</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card-surface rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="size-5 text-primary" />
              <h2 className="text-base font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New User Registration</p>
                  <p className="text-xs text-muted-foreground">Get notified when a new user signs up</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Failed Login Attempts</p>
                  <p className="text-xs text-muted-foreground">Alert on multiple failed login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="card-surface rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="size-5 text-primary" />
              <h2 className="text-base font-semibold">API Configuration</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Supabase URL</Label>
                <Input placeholder="https://your-project.supabase.co" className="rounded-xl" disabled />
                <p className="text-[11px] text-muted-foreground">Set via VITE_SUPABASE_URL environment variable</p>
              </div>
              <div className="space-y-2">
                <Label>Supabase Anon Key</Label>
                <Input type="password" placeholder="••••••••" className="rounded-xl" disabled />
                <p className="text-[11px] text-muted-foreground">Set via VITE_SUPABASE_ANON_KEY environment variable</p>
              </div>
            </div>
          </div>

          <Button className="w-full rounded-xl">Save Settings</Button>
        </main>
      </div>
    </div>
  );
}