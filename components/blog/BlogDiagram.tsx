import type { DiagramKind } from "@/content/blog";

interface Props {
  kind: DiagramKind;
  caption?: string;
}

export function BlogDiagram({ kind, caption }: Props) {
  const Diagram = REGISTRY[kind] ?? KillChain;
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-2xl glass overflow-hidden p-5 sm:p-7">
        <div className="w-full overflow-x-auto">
          <Diagram />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs font-mono uppercase tracking-[0.18em] text-fg-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ============================================================ */
/*  Shared primitives                                           */
/* ============================================================ */

function NodeBox({
  x,
  y,
  w = 120,
  h = 56,
  label,
  sub,
  tone = "cyan",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "cyan" | "purple" | "amber" | "red" | "green" | "muted";
}) {
  const fill: Record<string, string> = {
    cyan: "url(#gradCyan)",
    purple: "url(#gradPurple)",
    amber: "url(#gradAmber)",
    red: "url(#gradRed)",
    green: "url(#gradGreen)",
    muted: "rgba(255,255,255,0.04)",
  };
  const stroke: Record<string, string> = {
    cyan: "rgba(0,229,255,0.45)",
    purple: "rgba(168,85,247,0.45)",
    amber: "rgba(245,158,11,0.5)",
    red: "rgba(239,68,68,0.55)",
    green: "rgba(16,185,129,0.5)",
    muted: "rgba(255,255,255,0.15)",
  };
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill[tone]}
        stroke={stroke[tone]}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 5}
        textAnchor="middle"
        className="font-display"
        fontSize="12"
        fontWeight={700}
        fill="#e8eef7"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,238,247,0.55)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
  label,
  color = "rgba(0,229,255,0.6)",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  label?: string;
  color?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd="url(#arrowHead)"
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 6}
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,238,247,0.7)"
          className="font-mono"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <linearGradient id="gradCyan" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,229,255,0.18)" />
        <stop offset="100%" stopColor="rgba(0,229,255,0.06)" />
      </linearGradient>
      <linearGradient id="gradPurple" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(168,85,247,0.2)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0.06)" />
      </linearGradient>
      <linearGradient id="gradAmber" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(245,158,11,0.2)" />
        <stop offset="100%" stopColor="rgba(245,158,11,0.06)" />
      </linearGradient>
      <linearGradient id="gradRed" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(239,68,68,0.22)" />
        <stop offset="100%" stopColor="rgba(239,68,68,0.06)" />
      </linearGradient>
      <linearGradient id="gradGreen" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
        <stop offset="100%" stopColor="rgba(16,185,129,0.06)" />
      </linearGradient>
      <marker
        id="arrowHead"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,229,255,0.7)" />
      </marker>
    </defs>
  );
}

function SvgFrame({
  width = 720,
  height = 320,
  children,
}: {
  width?: number;
  height?: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ minWidth: 600 }}
      role="img"
    >
      <Defs />
      {children}
    </svg>
  );
}

/* ============================================================ */
/*  Diagrams                                                    */
/* ============================================================ */

function KerberosFlow() {
  return (
    <SvgFrame width={720} height={320}>
      <NodeBox x={40} y={120} w={120} h={70} label="Client" sub="user@corp.local" />
      <NodeBox x={300} y={40} w={120} h={70} label="KDC / AS" sub="DC role" tone="purple" />
      <NodeBox x={300} y={210} w={120} h={70} label="TGS" sub="DC role" tone="purple" />
      <NodeBox x={560} y={120} w={120} h={70} label="Service" sub="MSSQL / CIFS" tone="amber" />

      <Arrow x1={160} y1={140} x2={300} y2={75} label="1. AS-REQ" />
      <Arrow x1={300} y1={95} x2={160} y2={155} label="2. AS-REP (TGT)" />
      <Arrow x1={160} y1={170} x2={300} y2={245} label="3. TGS-REQ + TGT" />
      <Arrow x1={300} y1={265} x2={160} y2={185} label="4. TGS-REP (ST)" />
      <Arrow x1={160} y1={155} x2={560} y2={155} label="5. AP-REQ + ST" />
    </SvgFrame>
  );
}

function ADAttackChain() {
  return (
    <SvgFrame width={780} height={320}>
      <NodeBox x={20} y={130} w={130} h={60} label="Phishing" sub="initial access" tone="amber" />
      <NodeBox x={180} y={130} w={130} h={60} label="Workstation" sub="domain user" />
      <NodeBox x={340} y={50} w={130} h={60} label="BloodHound" sub="map paths" tone="purple" />
      <NodeBox x={340} y={210} w={130} h={60} label="Kerberoast" sub="crack offline" tone="purple" />
      <NodeBox x={500} y={130} w={130} h={60} label="Tier-1 Admin" sub="lateral move" tone="amber" />
      <NodeBox x={650} y={130} w={120} h={60} label="Domain Admin" sub="DCSync" tone="red" />

      <Arrow x1={150} y1={160} x2={180} y2={160} />
      <Arrow x1={310} y1={150} x2={340} y2={80} />
      <Arrow x1={310} y1={170} x2={340} y2={240} />
      <Arrow x1={470} y1={80} x2={500} y2={150} dashed label="path" />
      <Arrow x1={470} y1={240} x2={500} y2={170} dashed label="creds" />
      <Arrow x1={630} y1={160} x2={650} y2={160} />
    </SvgFrame>
  );
}

function BurpProxy() {
  return (
    <SvgFrame width={720} height={300}>
      <NodeBox x={40} y={110} w={140} h={70} label="Browser" sub="embedded Chromium" />
      <NodeBox x={290} y={110} w={140} h={70} label="Burp Proxy" sub="127.0.0.1:8080" tone="purple" />
      <NodeBox x={540} y={110} w={140} h={70} label="Target" sub="api.target.com" tone="amber" />

      <Arrow x1={180} y1={145} x2={290} y2={145} label="Request" />
      <Arrow x1={430} y1={145} x2={540} y2={145} label="Mutated" />
      <Arrow x1={540} y1={165} x2={430} y2={165} label="Response" color="rgba(168,85,247,0.6)" />
      <Arrow x1={290} y1={165} x2={180} y2={165} label="Forwarded" color="rgba(168,85,247,0.6)" />

      <g>
        <rect x={250} y={210} width={220} height={50} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x={360} y={232} textAnchor="middle" fontSize="11" fontWeight={700} fill="#e8eef7">Repeater · Intruder · Decoder</text>
        <text x={360} y={248} textAnchor="middle" fontSize="9" fill="rgba(232,238,247,0.55)">mutate · replay · enumerate · decode</text>
      </g>
    </SvgFrame>
  );
}

function NmapScanTypes() {
  return (
    <SvgFrame width={720} height={340}>
      {[
        { y: 30, name: "-sS SYN", color: "cyan", desc: "SYN → no ACK back · half-open · stealthy" },
        { y: 100, name: "-sT Connect", color: "purple", desc: "Full TCP handshake · OS-level connect()" },
        { y: 170, name: "-sU UDP", color: "amber", desc: "UDP packet · ICMP unreachable = closed" },
        { y: 240, name: "-sV Version", color: "green", desc: "Banner grab + service fingerprinting" },
      ].map((row) => (
        <g key={row.name}>
          <NodeBox x={20} y={row.y} w={150} h={50} label={row.name} tone={row.color as "cyan" | "purple" | "amber" | "green"} />
          <Arrow x1={170} y1={row.y + 25} x2={460} y2={row.y + 25} />
          <text x={480} y={row.y + 20} fontSize="11" fill="#e8eef7" fontWeight={600}>{row.desc.split(" · ")[0]}</text>
          <text x={480} y={row.y + 38} fontSize="9" fill="rgba(232,238,247,0.55)">{row.desc.split(" · ").slice(1).join(" · ")}</text>
        </g>
      ))}
    </SvgFrame>
  );
}

function MCPArchitecture() {
  return (
    <SvgFrame width={760} height={340}>
      <NodeBox x={30} y={140} w={140} h={70} label="LLM Agent" sub="Claude / GPT" />
      <NodeBox x={290} y={140} w={170} h={70} label="MCP Server" sub="tools · prompts · resources" tone="purple" />
      <NodeBox x={580} y={40} w={150} h={60} label="Filesystem" sub="read/write" tone="amber" />
      <NodeBox x={580} y={130} w={150} h={60} label="HTTP / API" sub="egress" tone="amber" />
      <NodeBox x={580} y={220} w={150} h={60} label="Shell / Exec" sub="subprocess" tone="red" />

      <Arrow x1={170} y1={170} x2={290} y2={170} label="tool call" />
      <Arrow x1={460} y1={170} x2={580} y2={70} dashed />
      <Arrow x1={460} y1={170} x2={580} y2={160} dashed />
      <Arrow x1={460} y1={170} x2={580} y2={250} dashed label="exec" color="rgba(239,68,68,0.7)" />

      <text x={375} y={285} textAnchor="middle" fontSize="10" fill="rgba(232,238,247,0.6)" className="font-mono">
        Trust boundary — input flows IN, attacker-controlled output flows BACK to context
      </text>
    </SvgFrame>
  );
}

function SocPyramid() {
  return (
    <SvgFrame width={620} height={340}>
      <polygon points="310,30 110,290 510,290" fill="url(#gradCyan)" stroke="rgba(0,229,255,0.4)" />
      <text x={310} y={70} textAnchor="middle" fontSize="13" fontWeight={700} fill="#e8eef7">L3 Threat Hunter</text>
      <text x={310} y={86} textAnchor="middle" fontSize="9" fill="rgba(232,238,247,0.55)">tradecraft · IR lead</text>
      <text x={310} y={170} textAnchor="middle" fontSize="13" fontWeight={700} fill="#e8eef7">L2 Triage Analyst</text>
      <text x={310} y={186} textAnchor="middle" fontSize="9" fill="rgba(232,238,247,0.55)">enrichment · escalation</text>
      <text x={310} y={260} textAnchor="middle" fontSize="13" fontWeight={700} fill="#e8eef7">L1 SOC Analyst</text>
      <text x={310} y={276} textAnchor="middle" fontSize="9" fill="rgba(232,238,247,0.55)">alert handling · ticketing</text>
    </SvgFrame>
  );
}

function ExamTimeline() {
  return (
    <SvgFrame width={720} height={260}>
      <line x1={40} y1={130} x2={680} y2={130} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
      {[
        { x: 80, label: "Hour 0", sub: "Scope read" },
        { x: 220, label: "Hour 6", sub: "Initial access" },
        { x: 360, label: "Hour 12", sub: "Sleep break" },
        { x: 500, label: "Hour 18", sub: "Lateral / C2" },
        { x: 640, label: "Hour 24", sub: "Submit notes" },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={130} r={8} fill="url(#gradCyan)" stroke="rgba(0,229,255,0.6)" />
          <text x={p.x} y={108} textAnchor="middle" fontSize="11" fontWeight={700} fill="#e8eef7">{p.label}</text>
          <text x={p.x} y={158} textAnchor="middle" fontSize="9" fill="rgba(232,238,247,0.55)">{p.sub}</text>
        </g>
      ))}
      <text x={360} y={210} textAnchor="middle" fontSize="11" fill="rgba(232,238,247,0.7)">+ 24h reporting window</text>
    </SvgFrame>
  );
}

function CertPath() {
  return (
    <SvgFrame width={780} height={260}>
      <NodeBox x={20} y={100} w={130} h={60} label="OSCP" sub="entry pentest" />
      <NodeBox x={180} y={100} w={130} h={60} label="CRTP" sub="AD foundations" tone="purple" />
      <NodeBox x={340} y={100} w={130} h={60} label="CRTO" sub="C2 + opsec" tone="amber" />
      <NodeBox x={500} y={100} w={130} h={60} label="CRTE" sub="multi-forest AD" tone="red" />
      <NodeBox x={660} y={100} w={110} h={60} label="OSEP / CRTM" sub="specialist" tone="purple" />
      {[150, 310, 470, 630].map((x) => (
        <Arrow key={x} x1={x} y1={130} x2={x + 30} y2={130} />
      ))}
    </SvgFrame>
  );
}

function IncidentLifecycle() {
  return (
    <SvgFrame width={720} height={300}>
      {[
        { x: 30, name: "Prepare", tone: "cyan" },
        { x: 170, name: "Identify", tone: "purple" },
        { x: 310, name: "Contain", tone: "amber" },
        { x: 450, name: "Eradicate", tone: "red" },
        { x: 590, name: "Recover", tone: "green" },
      ].map((p, i) => (
        <g key={p.name}>
          <NodeBox x={p.x} y={120} w={110} h={60} label={p.name} tone={p.tone as "cyan" | "purple" | "amber" | "red" | "green"} />
          {i < 4 && <Arrow x1={p.x + 110} y1={150} x2={p.x + 140} y2={150} />}
        </g>
      ))}
      <text x={360} y={230} textAnchor="middle" fontSize="11" fill="rgba(232,238,247,0.7)" className="font-mono">
        NIST SP 800-61 Rev. 2 — repeat after every incident
      </text>
    </SvgFrame>
  );
}

function KillChain() {
  return (
    <SvgFrame width={780} height={260}>
      {[
        "Recon", "Weaponize", "Deliver", "Exploit", "Install", "C2", "Action",
      ].map((label, i) => {
        const x = 20 + i * 110;
        return (
          <g key={label}>
            <NodeBox x={x} y={110} w={100} h={60} label={label} tone={i < 3 ? "cyan" : i < 5 ? "purple" : "red"} />
            {i < 6 && <Arrow x1={x + 100} y1={140} x2={x + 110} y2={140} />}
          </g>
        );
      })}
    </SvgFrame>
  );
}

const REGISTRY: Record<DiagramKind, () => React.ReactElement> = {
  "kerberos-flow": KerberosFlow,
  "ad-attack-chain": ADAttackChain,
  "burp-proxy": BurpProxy,
  "nmap-scan-types": NmapScanTypes,
  "mcp-architecture": MCPArchitecture,
  "soc-pyramid": SocPyramid,
  "exam-timeline": ExamTimeline,
  "cert-path": CertPath,
  "incident-lifecycle": IncidentLifecycle,
  "kill-chain": KillChain,
};
