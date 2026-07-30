import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Github, Lock, ShieldAlert, Sparkles, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signInDemo } from "@/hooks/use-session";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SentinelAI Supply Chain Security" },
      {
        name: "description",
        content:
          "Sign in to SentinelAI to monitor open-source provenance, SBOM coverage, blast radius and automated remediation across your repositories.",
      },
      { property: "og:title", content: "Sign in — SentinelAI" },
      {
        property: "og:description",
        content: "Continuous provenance and blast-radius remediation for your software supply chain.",
      },
    ],
  }),
  component: LoginPage,
});

const highlights = [
  { icon: Workflow, title: "Continuous provenance", body: "Signed SBOMs regenerated on every merge across all ecosystems." },
  { icon: ShieldAlert, title: "Blast-radius mapping", body: "See exactly which services a single transitive CVE can reach." },
  { icon: Sparkles, title: "AI remediation", body: "Upgrade paths, impact analysis and pull requests generated for you." },
];

function LoginPage() {
  const navigate = useNavigate();

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

          <h1 className="mt-10 font-display text-[26px] font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect your GitHub organization to continue monitoring your supply chain.
          </p>

          <Button
            size="lg"
            className="mt-8 w-full gap-2 rounded-xl"
            onClick={() => {
              signInDemo();
              navigate({ to: "/" });
            }}
          >
            <Github className="size-[18px]" /> Continue with GitHub
          </Button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="size-3" /> SSO, SAML and SCIM available on Enterprise
          </p>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Just exploring?{" "}
            <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
              Open the demo workspace
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-surface lg:block">
        <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[380px] rounded-full bg-ai/12 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center gap-6 px-14">
          <p className="max-w-md font-display text-2xl font-semibold leading-snug">
            Every dependency, every version, every path to production — continuously attested.
          </p>
          <ul className="space-y-3">
            {highlights.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="card-surface flex gap-3 p-4 animate-[var(--animate-fade-up)]"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
