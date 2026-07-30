import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { SectionCard, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { org } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SentinelAI" },
      {
        name: "description",
        content: "Manage organization details, scan policies, automated remediation rules and notification channels.",
      },
      { property: "og:title", content: "Settings — SentinelAI" },
      { property: "og:description", content: "Organization, policy and notification configuration for SentinelAI." },
    ],
  }),
  component: SettingsPage,
});

const policies = [
  { id: "p1", label: "Auto-open PRs for patch-level fixes", desc: "Minor and patch upgrades are raised automatically.", on: true },
  { id: "p2", label: "Block merges with new critical CVEs", desc: "Fails the SentinelAI status check on regressions.", on: true },
  { id: "p3", label: "Require signed SBOM attestations", desc: "Deployments must carry a Sigstore-signed bill of materials.", on: false },
  { id: "p4", label: "Auto-merge when checks pass", desc: "Low-risk upgrades merge without human review.", on: false },
];

const channels = [
  { id: "c1", label: "Critical vulnerability alerts", desc: "Immediate push and email for KEV-listed findings.", on: true },
  { id: "c2", label: "Weekly digest", desc: "Monday summary of posture and remediation velocity.", on: true },
  { id: "c3", label: "SBOM drift warnings", desc: "Notify when deployed artifacts diverge from attestations.", on: true },
];

function SettingsPage() {
  return (
    <AppShell title="Settings" description="Organization, policy and notification configuration.">
      <Tabs defaultValue="org">
        <TabsList className="rounded-xl">
          <TabsTrigger value="org" className="rounded-lg">Organization</TabsTrigger>
          <TabsTrigger value="policy" className="rounded-lg">Policies</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="org" className="mt-4">
          <SectionCard title="Organization" description="Applies to every connected repository.">
            <div className="grid max-w-xl gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="org-name">Display name</Label>
                <Input id="org-name" defaultValue={org.name} className="h-10 rounded-xl" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="org-handle">GitHub organization</Label>
                <Input id="org-handle" defaultValue={org.handle} className="h-10 rounded-xl font-mono text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <StatusPill tone="healthy">GitHub App installed</StatusPill>
                <StatusPill tone="info">{org.plan} plan</StatusPill>
              </div>
              <Button className="w-fit rounded-xl" onClick={() => toast.success("Organization updated")}>
                Save changes
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="policy" className="mt-4">
          <SectionCard title="Remediation policies">
            <ul className="divide-y divide-border">
              {policies.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch defaultChecked={p.on} aria-label={p.label} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <SectionCard title="Notification channels">
            <ul className="divide-y divide-border">
              {channels.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                  <Switch defaultChecked={c.on} aria-label={c.label} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
