import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Download, FileCode2, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { SectionCard, StatusPill } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sboms } from "@/lib/mock-data";

export const Route = createFileRoute("/sbom")({
  head: () => ({
    meta: [
      { title: "SBOM Explorer — SentinelAI" },
      {
        name: "description",
        content: "Generate, sign and download CycloneDX and SPDX software bills of materials with full version history.",
      },
      { property: "og:title", content: "SBOM Explorer — SentinelAI" },
      { property: "og:description", content: "CycloneDX and SPDX bills of materials for every repository." },
    ],
  }),
  component: SbomPage,
});

const sample = `{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "serialNumber": "urn:uuid:8f2b...c41a",
  "version": 18,
  "metadata": {
    "component": { "type": "application", "name": "payments-api" },
    "tools": [{ "vendor": "SentinelAI", "name": "provenance-engine" }]
  },
  "components": [
    { "type": "library", "name": "axios", "version": "1.7.7", "licenses": [{ "license": { "id": "MIT" } }] },
    { "type": "library", "name": "@northwind/http-kit", "version": "3.4.0" }
  ]
}`;

function SbomPage() {
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success("SBOM generated", { description: "CycloneDX 1.6 · 812 components · signed" });
    }, 1400);
  };

  return (
    <AppShell
      title="SBOM explorer"
      description="Signed, reproducible bills of materials generated on every merge."
      actions={
        <>
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => toast("Export queued", { description: "You'll get a link when the bundle is ready." })}>
            <Download className="size-4" /> Export all
          </Button>
          <Button className="gap-2 rounded-xl" onClick={generate} disabled={generating}>
            <RefreshCw className={`size-4 ${generating ? "animate-spin" : ""}`} /> Generate SBOM
          </Button>
        </>
      }
    >
      <Tabs defaultValue="inventory">
        <TabsList className="rounded-xl">
          <TabsTrigger value="inventory" className="rounded-lg">Inventory</TabsTrigger>
          <TabsTrigger value="preview" className="rounded-lg">Document preview</TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">Version history</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-4">
          <SectionCard title="Generated SBOMs" description="CycloneDX 1.6 and SPDX 2.3 documents per repository.">
            {generating ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-2.5 font-medium">Repository</th>
                      <th className="py-2.5 font-medium">Format</th>
                      <th className="py-2.5 font-medium">Version</th>
                      <th className="py-2.5 font-medium">Components</th>
                      <th className="py-2.5 font-medium">Attestation</th>
                      <th className="py-2.5 font-medium">Generated</th>
                      <th className="py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sboms.map((s) => (
                      <tr key={s.id} className="transition-colors hover:bg-muted/40">
                        <td className="py-3.5 font-medium">{s.repo}</td>
                        <td className="py-3.5"><StatusPill tone="info">{s.format}</StatusPill></td>
                        <td className="py-3.5 font-mono text-xs">{s.version}</td>
                        <td className="py-3.5 tabular-nums">{s.components.toLocaleString()}</td>
                        <td className="py-3.5">
                          {s.signed ? (
                            <StatusPill tone="healthy"><ShieldCheck className="size-3" /> Signed</StatusPill>
                          ) : (
                            <StatusPill tone="warning">Unsigned</StatusPill>
                          )}
                        </td>
                        <td className="py-3.5 text-muted-foreground">{s.generated} · {s.size}</td>
                        <td className="py-3.5 text-right">
                          <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => toast.success(`Downloading ${s.repo} ${s.version}`)}>
                            <Download className="size-3.5" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <SectionCard title="payments-api · CycloneDX 1.6 · v18" description="Truncated preview of the signed document.">
            <pre className="overflow-x-auto rounded-xl bg-muted/50 p-4 font-mono text-xs leading-relaxed">{sample}</pre>
          </SectionCard>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <SectionCard title="Version history" description="payments-api">
            <ol className="relative space-y-5 pl-6">
              <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border" aria-hidden />
              {[
                { v: "v18", when: "30 Jul 2026 09:12", note: "axios 1.6.2 → 1.7.7, http-kit 3.4.0" },
                { v: "v17", when: "24 Jul 2026 14:03", note: "3 components added, 1 removed" },
                { v: "v16", when: "18 Jul 2026 08:47", note: "Initial signed attestation with Sigstore" },
              ].map((h) => (
                <li key={h.v} className="relative">
                  <span className="absolute -left-6 top-1.5 grid size-3.5 place-items-center rounded-full bg-healthy ring-4 ring-card" />
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <FileCode2 className="size-4 text-primary" /> {h.v}
                    <CheckCircle2 className="size-3.5 text-healthy" />
                  </p>
                  <p className="text-xs text-muted-foreground">{h.when} · {h.note}</p>
                </li>
              ))}
            </ol>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
