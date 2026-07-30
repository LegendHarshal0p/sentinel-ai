// Demo dataset powering the SentinelAI console.
// Replace with live queries when the backend is connected.

export type Severity = "critical" | "high" | "medium" | "low";

export const org = {
  name: "Northwind Labs",
  plan: "Enterprise",
  handle: "northwind-labs",
};

export const kpis = {
  securityScore: 82,
  securityScoreDelta: +4,
  criticalVulns: 14,
  criticalVulnsDelta: -6,
  repositories: 46,
  repositoriesDelta: +3,
  dependencies: 12480,
  dependenciesDelta: +214,
  sbomCoverage: 94,
  sbomCoverageDelta: +2,
  autoRemediationRate: 71,
  autoRemediationRateDelta: +9,
};

export const trend = [
  { month: "Feb", critical: 41, high: 88, resolved: 52, score: 64 },
  { month: "Mar", critical: 37, high: 81, resolved: 66, score: 68 },
  { month: "Apr", critical: 33, high: 74, resolved: 71, score: 71 },
  { month: "May", critical: 28, high: 69, resolved: 80, score: 74 },
  { month: "Jun", critical: 21, high: 58, resolved: 96, score: 78 },
  { month: "Jul", critical: 14, high: 46, resolved: 118, score: 82 },
];

export const dependencyGrowth = [
  { month: "Feb", direct: 1180, transitive: 9120 },
  { month: "Mar", direct: 1215, transitive: 9540 },
  { month: "Apr", direct: 1264, transitive: 9980 },
  { month: "May", direct: 1301, transitive: 10420 },
  { month: "Jun", direct: 1352, transitive: 10810 },
  { month: "Jul", direct: 1398, transitive: 11082 },
];

export const ecosystemSplit = [
  { name: "npm", value: 6120 },
  { name: "PyPI", value: 2840 },
  { name: "Maven", value: 1960 },
  { name: "Go", value: 1010 },
  { name: "Cargo", value: 550 },
];

export type Repository = {
  id: string;
  name: string;
  language: string;
  visibility: "private" | "public";
  score: number;
  critical: number;
  high: number;
  deps: number;
  sbom: "current" | "stale" | "missing";
  lastScan: string;
};

export const repositories: Repository[] = [
  { id: "r1", name: "northwind/payments-api", language: "TypeScript", visibility: "private", score: 91, critical: 0, high: 2, deps: 812, sbom: "current", lastScan: "6 min ago" },
  { id: "r2", name: "northwind/ledger-core", language: "Go", visibility: "private", score: 74, critical: 3, high: 8, deps: 421, sbom: "current", lastScan: "22 min ago" },
  { id: "r3", name: "northwind/web-console", language: "TypeScript", visibility: "private", score: 63, critical: 5, high: 11, deps: 1904, sbom: "stale", lastScan: "1 h ago" },
  { id: "r4", name: "northwind/risk-ml", language: "Python", visibility: "private", score: 58, critical: 6, high: 14, deps: 1387, sbom: "stale", lastScan: "3 h ago" },
  { id: "r5", name: "northwind/edge-gateway", language: "Rust", visibility: "private", score: 96, critical: 0, high: 1, deps: 268, sbom: "current", lastScan: "12 min ago" },
  { id: "r6", name: "northwind/docs-site", language: "TypeScript", visibility: "public", score: 88, critical: 0, high: 3, deps: 640, sbom: "missing", lastScan: "9 h ago" },
  { id: "r7", name: "northwind/batch-jobs", language: "Java", visibility: "private", score: 70, critical: 2, high: 9, deps: 1122, sbom: "current", lastScan: "41 min ago" },
  { id: "r8", name: "northwind/mobile-sdk", language: "Kotlin", visibility: "private", score: 84, critical: 1, high: 4, deps: 508, sbom: "current", lastScan: "2 h ago" },
];

export type Vulnerability = {
  id: string;
  cve: string;
  title: string;
  severity: Severity;
  cvss: number;
  pkg: string;
  version: string;
  fixed: string;
  repos: string[];
  published: string;
  exploited: boolean;
  summary: string;
};

export const vulnerabilities: Vulnerability[] = [
  { id: "v1", cve: "CVE-2026-3391", title: "Prototype pollution in deep-merge chain", severity: "critical", cvss: 9.8, pkg: "lodash.mergewith", version: "4.6.1", fixed: "4.6.3", repos: ["northwind/web-console", "northwind/payments-api"], published: "2026-07-21", exploited: true, summary: "Unsafe recursive merge allows attacker-controlled keys to reach Object.prototype, enabling remote property injection and downstream RCE in SSR handlers." },
  { id: "v2", cve: "CVE-2026-2210", title: "Deserialization of untrusted data", severity: "critical", cvss: 9.1, pkg: "org.apache.commons:commons-text", version: "1.9.0", fixed: "1.12.0", repos: ["northwind/batch-jobs"], published: "2026-07-18", exploited: false, summary: "String interpolation lookups evaluate script expressions, allowing arbitrary code execution from untrusted templates." },
  { id: "v3", cve: "CVE-2026-1877", title: "Improper certificate validation in TLS handshake", severity: "high", cvss: 8.2, pkg: "golang.org/x/crypto", version: "0.21.0", fixed: "0.28.0", repos: ["northwind/ledger-core", "northwind/edge-gateway"], published: "2026-07-11", exploited: false, summary: "Peer certificate chain is accepted without hostname verification under specific ALPN negotiation paths." },
  { id: "v4", cve: "CVE-2026-1544", title: "Regular expression denial of service", severity: "high", cvss: 7.5, pkg: "semver", version: "7.3.5", fixed: "7.6.2", repos: ["northwind/web-console", "northwind/docs-site"], published: "2026-06-30", exploited: false, summary: "Catastrophic backtracking on crafted range strings stalls the event loop." },
  { id: "v5", cve: "CVE-2026-1102", title: "Arbitrary file write via path traversal", severity: "high", cvss: 7.8, pkg: "tarfile-utils", version: "2.1.0", fixed: "2.3.1", repos: ["northwind/risk-ml"], published: "2026-06-22", exploited: true, summary: "Archive extraction does not normalise member paths, permitting writes outside the destination directory." },
  { id: "v6", cve: "CVE-2026-0918", title: "Sensitive data exposure in debug logs", severity: "medium", cvss: 5.9, pkg: "axios", version: "1.6.2", fixed: "1.7.7", repos: ["northwind/payments-api", "northwind/mobile-sdk"], published: "2026-06-14", exploited: false, summary: "Authorization headers are echoed into verbose transport logs when retries are enabled." },
  { id: "v7", cve: "CVE-2026-0740", title: "Open redirect in router middleware", severity: "medium", cvss: 5.4, pkg: "express-session", version: "1.17.2", fixed: "1.18.0", repos: ["northwind/docs-site"], published: "2026-05-29", exploited: false, summary: "Return-to parameters are not validated against an allow-list of same-origin paths." },
  { id: "v8", cve: "CVE-2026-0455", title: "Timing side channel in token comparison", severity: "low", cvss: 3.7, pkg: "jwt-lite", version: "0.9.4", fixed: "0.11.0", repos: ["northwind/ledger-core"], published: "2026-05-08", exploited: false, summary: "Signature comparison is not constant time, leaking bytes under repeated measurement." },
];

export type PullRequest = {
  id: string;
  title: string;
  repo: string;
  pkg: string;
  from: string;
  to: string;
  status: "merged" | "open" | "checks-failed" | "queued";
  tests: "passed" | "failed" | "running";
  deploy: "deployed" | "staged" | "pending";
  risk: "low" | "medium" | "high";
  author: "SentinelAI bot" | "Maya Okafor" | "Dev Patel";
  age: string;
};

export const pullRequests: PullRequest[] = [
  { id: "pr1", title: "chore(deps): bump lodash.mergewith 4.6.1 → 4.6.3", repo: "northwind/web-console", pkg: "lodash.mergewith", from: "4.6.1", to: "4.6.3", status: "open", tests: "passed", deploy: "staged", risk: "low", author: "SentinelAI bot", age: "12 min" },
  { id: "pr2", title: "fix(deps): commons-text 1.9.0 → 1.12.0", repo: "northwind/batch-jobs", pkg: "commons-text", from: "1.9.0", to: "1.12.0", status: "checks-failed", tests: "failed", deploy: "pending", risk: "high", author: "SentinelAI bot", age: "48 min" },
  { id: "pr3", title: "chore(deps): x/crypto 0.21.0 → 0.28.0", repo: "northwind/ledger-core", pkg: "golang.org/x/crypto", from: "0.21.0", to: "0.28.0", status: "merged", tests: "passed", deploy: "deployed", risk: "medium", author: "SentinelAI bot", age: "5 h" },
  { id: "pr4", title: "chore(deps): semver 7.3.5 → 7.6.2", repo: "northwind/docs-site", pkg: "semver", from: "7.3.5", to: "7.6.2", status: "queued", tests: "running", deploy: "pending", risk: "low", author: "SentinelAI bot", age: "3 min" },
  { id: "pr5", title: "fix(deps): axios 1.6.2 → 1.7.7", repo: "northwind/payments-api", pkg: "axios", from: "1.6.2", to: "1.7.7", status: "merged", tests: "passed", deploy: "deployed", risk: "low", author: "Maya Okafor", age: "1 d" },
];

export type Sbom = {
  id: string;
  repo: string;
  format: "CycloneDX 1.6" | "SPDX 2.3";
  version: string;
  components: number;
  generated: string;
  signed: boolean;
  size: string;
};

export const sboms: Sbom[] = [
  { id: "s1", repo: "northwind/payments-api", format: "CycloneDX 1.6", version: "v18", components: 812, generated: "2026-07-30 09:12", signed: true, size: "412 KB" },
  { id: "s2", repo: "northwind/ledger-core", format: "SPDX 2.3", version: "v11", components: 421, generated: "2026-07-30 08:41", signed: true, size: "228 KB" },
  { id: "s3", repo: "northwind/web-console", format: "CycloneDX 1.6", version: "v27", components: 1904, generated: "2026-07-29 21:04", signed: false, size: "1.1 MB" },
  { id: "s4", repo: "northwind/edge-gateway", format: "CycloneDX 1.6", version: "v9", components: 268, generated: "2026-07-30 09:31", signed: true, size: "134 KB" },
  { id: "s5", repo: "northwind/risk-ml", format: "SPDX 2.3", version: "v14", components: 1387, generated: "2026-07-29 17:55", signed: false, size: "742 KB" },
];

export const aiInsights = [
  {
    id: "a1",
    title: "Payments blast radius is concentrated in one transitive package",
    confidence: 0.93,
    kind: "Risk prediction",
    body: "lodash.mergewith reaches 6 services through @northwind/http-kit. Patching a single internal package removes 71% of the critical exposure in the payments domain.",
    action: "Bump @northwind/http-kit to 3.4.0 and re-run affected SBOMs.",
  },
  {
    id: "a2",
    title: "commons-text upgrade will break two batch jobs",
    confidence: 0.81,
    kind: "Change impact",
    body: "Static analysis found StringSubstitutor usage with custom lookups in 2 modules. The 1.12.0 API removes the default interpolator, which is the likely cause of the failing checks on PR #482.",
    action: "Apply the interpolator shim, then re-queue the automated upgrade.",
  },
  {
    id: "a3",
    title: "Drift detected: 3 repositories missing fresh SBOMs",
    confidence: 0.97,
    kind: "Coverage",
    body: "web-console, risk-ml and docs-site have shipped commits since their last SBOM generation, so provenance attestations no longer match deployed artifacts.",
    action: "Enable generate-on-merge for these repositories.",
  },
];

export const activity = [
  { id: "n1", type: "critical", title: "New critical CVE-2026-3391 affects 2 repositories", time: "6 min ago" },
  { id: "n2", type: "info", title: "SBOM v18 generated for payments-api", time: "18 min ago" },
  { id: "n3", type: "ai", title: "AI flagged an upgrade path for commons-text", time: "48 min ago" },
  { id: "n4", type: "healthy", title: "PR #479 merged — x/crypto patched in ledger-core", time: "5 h ago" },
  { id: "n5", type: "healthy", title: "edge-gateway scan completed with zero findings", time: "7 h ago" },
];

export const heatmap = [
  { repo: "web-console", cells: [3, 5, 4, 2, 5, 4, 3] },
  { repo: "risk-ml", cells: [4, 4, 5, 5, 3, 3, 4] },
  { repo: "batch-jobs", cells: [2, 3, 3, 4, 2, 2, 3] },
  { repo: "ledger-core", cells: [1, 2, 2, 3, 2, 1, 1] },
  { repo: "payments-api", cells: [1, 1, 2, 1, 1, 0, 1] },
  { repo: "edge-gateway", cells: [0, 1, 0, 1, 0, 0, 0] },
];

export type PackageNode = {
  id: string;
  name: string;
  version: string;
  ecosystem: string;
  status: "healthy" | "critical" | "warning";
  direct: boolean;
  dependents: number;
  license: string;
};

export const packages: PackageNode[] = [
  { id: "p1", name: "@northwind/http-kit", version: "3.2.1", ecosystem: "npm", status: "critical", direct: true, dependents: 6, license: "Apache-2.0" },
  { id: "p2", name: "lodash.mergewith", version: "4.6.1", ecosystem: "npm", status: "critical", direct: false, dependents: 9, license: "MIT" },
  { id: "p3", name: "axios", version: "1.6.2", ecosystem: "npm", status: "warning", direct: true, dependents: 12, license: "MIT" },
  { id: "p4", name: "react", version: "19.2.0", ecosystem: "npm", status: "healthy", direct: true, dependents: 4, license: "MIT" },
  { id: "p5", name: "semver", version: "7.3.5", ecosystem: "npm", status: "warning", direct: false, dependents: 22, license: "ISC" },
  { id: "p6", name: "golang.org/x/crypto", version: "0.21.0", ecosystem: "Go", status: "critical", direct: true, dependents: 3, license: "BSD-3" },
  { id: "p7", name: "commons-text", version: "1.9.0", ecosystem: "Maven", status: "critical", direct: true, dependents: 2, license: "Apache-2.0" },
  { id: "p8", name: "pydantic", version: "2.7.1", ecosystem: "PyPI", status: "healthy", direct: true, dependents: 5, license: "MIT" },
  { id: "p9", name: "tarfile-utils", version: "2.1.0", ecosystem: "PyPI", status: "critical", direct: false, dependents: 2, license: "MIT" },
  { id: "p10", name: "tokio", version: "1.38.0", ecosystem: "Cargo", status: "healthy", direct: true, dependents: 1, license: "MIT" },
];
