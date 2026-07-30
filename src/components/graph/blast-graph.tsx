import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeBase =
  "rounded-xl border px-3 py-2 text-[11px] font-medium shadow-[var(--shadow-card)] bg-card";

export const graphNodes: Node[] = [
  { id: "svc-payments", position: { x: 40, y: 40 }, data: { label: "payments-api" }, className: `${nodeBase} border-healthy/40 text-healthy` },
  { id: "svc-console", position: { x: 40, y: 140 }, data: { label: "web-console" }, className: `${nodeBase} border-critical/50 text-critical` },
  { id: "svc-ledger", position: { x: 40, y: 240 }, data: { label: "ledger-core" }, className: `${nodeBase} border-high/50 text-high` },
  { id: "svc-batch", position: { x: 40, y: 340 }, data: { label: "batch-jobs" }, className: `${nodeBase} border-critical/50 text-critical` },
  { id: "kit", position: { x: 300, y: 90 }, data: { label: "@northwind/http-kit 3.2.1" }, className: `${nodeBase} border-primary/50 text-primary` },
  { id: "axios", position: { x: 300, y: 200 }, data: { label: "axios 1.6.2" }, className: `${nodeBase} border-info/40 text-info` },
  { id: "crypto", position: { x: 300, y: 300 }, data: { label: "x/crypto 0.21.0" }, className: `${nodeBase} border-critical/50 text-critical` },
  { id: "commons", position: { x: 300, y: 390 }, data: { label: "commons-text 1.9.0" }, className: `${nodeBase} border-critical/50 text-critical` },
  { id: "merge", position: { x: 580, y: 120 }, data: { label: "lodash.mergewith 4.6.1" }, className: `${nodeBase} border-critical/60 text-critical` },
  { id: "semver", position: { x: 580, y: 230 }, data: { label: "semver 7.3.5" }, className: `${nodeBase} border-high/50 text-high` },
  { id: "cve1", position: { x: 830, y: 120 }, data: { label: "CVE-2026-3391 · 9.8" }, className: `${nodeBase} border-critical bg-critical/10 text-critical` },
  { id: "cve2", position: { x: 830, y: 300 }, data: { label: "CVE-2026-1877 · 8.2" }, className: `${nodeBase} border-critical bg-critical/10 text-critical` },
];

const risky = { stroke: "var(--critical)", strokeWidth: 2 };
const calm = { stroke: "var(--border)", strokeWidth: 1.5 };

export const graphEdges: Edge[] = [
  { id: "e1", source: "svc-payments", target: "kit", animated: true, style: risky },
  { id: "e2", source: "svc-console", target: "kit", animated: true, style: risky },
  { id: "e3", source: "svc-ledger", target: "axios", style: calm },
  { id: "e4", source: "svc-ledger", target: "crypto", animated: true, style: risky },
  { id: "e5", source: "svc-batch", target: "commons", animated: true, style: risky },
  { id: "e6", source: "kit", target: "merge", animated: true, style: risky },
  { id: "e7", source: "axios", target: "semver", style: calm },
  { id: "e8", source: "kit", target: "semver", style: calm },
  { id: "e9", source: "merge", target: "cve1", animated: true, style: risky },
  { id: "e10", source: "crypto", target: "cve2", animated: true, style: risky },
];

export default function BlastGraph({ onSelect }: { onSelect?: NodeMouseHandler }) {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <ReactFlow
        nodes={graphNodes}
        edges={graphEdges}
        onNodeClick={onSelect}
        fitView
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
      >
        <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="var(--border)" />
        <MiniMap pannable zoomable className="!rounded-xl !border !border-border !bg-card" />
        <Controls className="!rounded-xl !border !border-border !bg-card !shadow-[var(--shadow-card)]" />
      </ReactFlow>
    </div>
  );
}
