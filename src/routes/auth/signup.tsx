import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, ShieldAlert, Truck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type UserRole } from "@/lib/auth-context";

export const Route = createFileRoute("/auth/signup")({
  component: AuthSignupPage,
});

function AuthSignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password, fullName, selectedRole, phone);

    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center animate-[var(--animate-fade-up)]">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-healthy/12 text-healthy">
            <ShieldAlert className="size-8" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-semibold">Account created!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your email to verify your account before signing in.
          </p>
          <Button
            className="mt-6 w-full rounded-xl"
            onClick={() => navigate({ to: "/auth/login" })}
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

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

          <h1 className="mt-10 font-display text-[26px] font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up as a driver or customer to get started.
          </p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole("customer")}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                selectedRole === "customer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <User className="size-6" />
              Customer
              <span className="text-[11px] font-normal text-muted-foreground">Track & manage shipments</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("driver")}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                selectedRole === "driver"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Truck className="size-6" />
              Driver
              <span className="text-[11px] font-normal text-muted-foreground">Deliver & earn</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-xl pl-9"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl"
              disabled={loading}
            >
              {loading ? "Creating account..." : `Sign up as ${selectedRole === "driver" ? "Driver" : "Customer"}`}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-surface lg:block">
        <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[380px] rounded-full bg-ai/12 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center gap-6 px-14">
          <p className="max-w-md font-display text-2xl font-semibold leading-snug">
            Join SentinelAI and experience secure, monitored logistics.
          </p>
          <div className="space-y-4">
            <div className="card-surface p-4">
              <p className="text-sm font-semibold">🚀 Quick onboarding</p>
              <p className="mt-1 text-xs text-muted-foreground">Get started in minutes with our streamlined signup process.</p>
            </div>
            <div className="card-surface p-4">
              <p className="text-sm font-semibold">🔒 Enterprise security</p>
              <p className="mt-1 text-xs text-muted-foreground">Your data is protected with industry-leading encryption.</p>
            </div>
            <div className="card-surface p-4">
              <p className="text-sm font-semibold">📊 Real-time tracking</p>
              <p className="mt-1 text-xs text-muted-foreground">Monitor every step of your supply chain in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}