import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Truck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type UserRole } from "@/lib/auth-context";

export const Route = createFileRoute("/auth/login")({
  component: AuthLoginPage,
});

function AuthLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
      return;
    }

    // Redirect based on role after login
    if (selectedRole === "admin") {
      navigate({ to: "/admin" });
    } else if (selectedRole === "driver") {
      navigate({ to: "/driver/dashboard" });
    } else {
      navigate({ to: "/" });
    }
    setLoading(false);
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-sm animate-[var(--animate-fade-up)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
              <ShieldAlert className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">SentinelAI</p>
              <p className="text-xs text-muted-foreground">Provenance & Remediation Engine</p>
            </div>
          </div>

          <h1 className="mt-10 font-display text-[26px] font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account.
          </p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole("customer")}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                selectedRole === "customer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <User className="size-5" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("driver")}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                selectedRole === "driver"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Truck className="size-5" />
              Driver
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                selectedRole === "admin"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <ShieldAlert className="size-5" />
              Admin
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pl-9 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-surface lg:block">
        <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[380px] rounded-full bg-ai/12 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center gap-6 px-14">
          <p className="max-w-md font-display text-2xl font-semibold leading-snug">
            Secure supply chain monitoring for drivers and customers.
          </p>
          <ul className="space-y-3">
            <li className="card-surface flex gap-3 p-4 animate-[var(--animate-fade-up)]">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <User className="size-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold">Customer Portal</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Track deliveries and manage your shipments in real-time.</p>
              </div>
            </li>
            <li className="card-surface flex gap-3 p-4 animate-[var(--animate-fade-up)]" style={{ animationDelay: "90ms" }}>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Truck className="size-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold">Driver Dashboard</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Manage routes, deliveries, and earnings efficiently.</p>
              </div>
            </li>
            <li className="card-surface flex gap-3 p-4 animate-[var(--animate-fade-up)]" style={{ animationDelay: "180ms" }}>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <ShieldAlert className="size-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold">Admin Control</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Full oversight of users, drivers, and system operations.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}