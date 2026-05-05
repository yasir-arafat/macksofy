/**
 * Per-slug hero illustrations.
 *
 * Each illustration is a 16:9 inline SVG scene with topic-specific
 * imagery. They share a common gradient defs block and a frame wrapper.
 */

type Slug =
  | "soc-200-osda-exam-tips-2026"
  | "windows-ad-attack-cheatsheet-2026"
  | "burp-suite-for-beginners-2026"
  | "nmap-cheatsheet-2026"
  | "active-directory-pentest-guide-india-2026"
  | "crto-vs-oscp-honest-comparison-2026"
  | "mcp-server-security-how-hacked-2026"
  | "ecih-vs-gcih-incident-handler-certification-2026"
  | "cpts-vs-oscp-certification-comparison-india-2026"
  | "crtp-vs-crte-certification-guide-india-2026";

interface IllustrationProps {
  className?: string;
}

/* ============================================================ */
/*  Shared defs                                                 */
/* ============================================================ */

function CommonDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-cyan`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id={`${id}-purple`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id={`${id}-amber`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id={`${id}-rose`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#be123c" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id={`${id}-green`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#16a34a" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id={`${id}-bg`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#0a0a14" />
        <stop offset="100%" stopColor="#050510" />
      </linearGradient>
      <radialGradient id={`${id}-glow-cyan`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-glow-purple`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
      <pattern
        id={`${id}-grid`}
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 28 0 L 0 0 0 28"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
        />
      </pattern>
      <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  );
}

function Frame({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-line ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        role="img"
      >
        <CommonDefs id={id} />
        <rect width="800" height="450" fill={`url(#${id}-bg)`} />
        <rect width="800" height="450" fill={`url(#${id}-grid)`} />
        {children}
      </svg>
    </div>
  );
}

/* ============================================================ */
/*  1. SOC-200 / OSDA — Defense Analyst at Console              */
/* ============================================================ */

function SocAnalyst({ className }: IllustrationProps) {
  const id = "soc";
  return (
    <Frame id={id} className={className}>
      <circle cx="200" cy="220" r="220" fill={`url(#${id}-glow-cyan)`} />
      <circle cx="640" cy="320" r="180" fill={`url(#${id}-glow-purple)`} />

      {/* monitor stand */}
      <rect x="370" y="370" width="60" height="14" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="320" y="384" width="160" height="6" rx="3" fill="rgba(255,255,255,0.12)" />

      {/* main monitor */}
      <g>
        <rect x="180" y="80" width="440" height="290" rx="14" fill="rgba(10,10,18,0.9)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
        <rect x="180" y="80" width="440" height="26" rx="14" fill="rgba(34,211,238,0.08)" />
        <circle cx="200" cy="93" r="3.5" fill="#fb7185" />
        <circle cx="214" cy="93" r="3.5" fill="#fbbf24" />
        <circle cx="228" cy="93" r="3.5" fill="#4ade80" />
        <text x="600" y="97" textAnchor="end" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.5)">SIEM · LIVE</text>

        {/* sidebar */}
        <rect x="195" y="120" width="100" height="235" rx="6" fill="rgba(255,255,255,0.03)" />
        {[140, 168, 196, 224, 252, 280, 308].map((y, i) => (
          <g key={y}>
            <circle cx="210" cy={y} r="3" fill={i === 1 ? "#fb7185" : i === 3 ? "#fbbf24" : "#22d3ee"} />
            <rect x="222" y={y - 4} width={50 + (i % 3) * 12} height="6" rx="1" fill="rgba(255,255,255,0.12)" />
          </g>
        ))}

        {/* main panel — alert chart */}
        <g>
          <rect x="310" y="130" width="295" height="100" rx="8" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.18)" />
          <text x="320" y="148" fontSize="9" fontFamily="monospace" fill="rgba(34,211,238,0.8)">EVENTS PER MINUTE</text>
          {/* chart bars */}
          {[35, 55, 42, 78, 95, 120, 88, 65, 92, 110, 135, 98, 75, 60, 82, 105, 142, 128, 95, 70].map((h, i) => (
            <rect
              key={i}
              x={325 + i * 13.5}
              y={222 - h * 0.5}
              width="9"
              height={h * 0.5}
              rx="1.5"
              fill={h > 110 ? "url(#soc-rose)" : h > 80 ? "url(#soc-amber)" : "url(#soc-cyan)"}
            />
          ))}
        </g>

        {/* alert tickets */}
        <g>
          <rect x="310" y="245" width="295" height="105" rx="8" fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.18)" />
          <text x="320" y="263" fontSize="9" fontFamily="monospace" fill="rgba(168,85,247,0.85)">ACTIVE ALERTS · 7</text>
          {[
            { y: 278, sev: "rose", txt: "T1003.001 · LSASS access" },
            { y: 296, sev: "amber", txt: "T1059.001 · Encoded PS" },
            { y: 314, sev: "amber", txt: "T1071.001 · C2 beacon" },
            { y: 332, sev: "cyan", txt: "T1082 · System enum" },
          ].map((row) => (
            <g key={row.txt}>
              <circle cx="328" cy={row.y} r="3.5" fill={`url(#soc-${row.sev})`} />
              <rect x="338" y={row.y - 4} width="180" height="7" rx="1.5" fill="rgba(255,255,255,0.18)" />
              <rect x="525" y={row.y - 4} width="65" height="7" rx="1.5" fill="rgba(255,255,255,0.06)" />
            </g>
          ))}
        </g>
      </g>

      {/* Floating shield */}
      <g transform="translate(640, 90)">
        <path
          d="M 0 0 L 50 0 L 50 35 Q 50 60 25 75 Q 0 60 0 35 Z"
          fill="url(#soc-cyan)"
          stroke="rgba(34,211,238,0.7)"
          strokeWidth="1.5"
        />
        <path
          d="M 12 35 L 22 45 L 38 25"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  2. Windows AD Attack Cheatsheet                             */
/* ============================================================ */

function ADCheatsheet({ className }: IllustrationProps) {
  const id = "adc";
  return (
    <Frame id={id} className={className}>
      <circle cx="400" cy="225" r="280" fill={`url(#${id}-glow-purple)`} />

      {/* connections */}
      <g stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" fill="none">
        <path d="M 400 110 L 200 230" />
        <path d="M 400 110 L 320 230" />
        <path d="M 400 110 L 480 230" />
        <path d="M 400 110 L 600 230" />
        <path d="M 200 260 L 160 360" />
        <path d="M 200 260 L 240 360" />
        <path d="M 320 260 L 320 360" />
        <path d="M 480 260 L 480 360" />
        <path d="M 600 260 L 560 360" />
        <path d="M 600 260 L 640 360" />
      </g>

      {/* attack chain — red dashed */}
      <g stroke="#fb7185" strokeWidth="2.5" strokeDasharray="6 4" fill="none">
        <path d="M 240 360 L 320 260 L 480 230 L 400 110" markerEnd="url(#adc-arrow)" />
      </g>
      <defs>
        <marker id="adc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#fb7185" />
        </marker>
      </defs>

      {/* DC at top */}
      <g transform="translate(370, 80)">
        <rect width="60" height="60" rx="8" fill="url(#adc-amber)" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" />
        <rect x="10" y="14" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
        <rect x="10" y="24" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
        <rect x="10" y="34" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
        <circle cx="50" cy="20" r="2" fill="#4ade80" />
        <circle cx="50" cy="30" r="2" fill="#4ade80" />
        <text x="30" y="80" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(251,191,36,0.9)">DC · krbtgt</text>
      </g>

      {/* Crown over DC = DA */}
      <g transform="translate(370, 50)">
        <path d="M 0 25 L 12 10 L 30 22 L 48 10 L 60 25 L 60 30 L 0 30 Z" fill="#fbbf24" />
        <circle cx="12" cy="10" r="3" fill="#fb7185" />
        <circle cx="30" cy="22" r="3" fill="#fb7185" />
        <circle cx="48" cy="10" r="3" fill="#fb7185" />
      </g>

      {/* Tier-1 servers row */}
      {[170, 290, 450, 570].map((x, i) => (
        <g key={x} transform={`translate(${x}, 220)`}>
          <rect width="60" height="50" rx="6" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.2" />
          <rect x="10" y="10" width="40" height="5" rx="1" fill="rgba(34,211,238,0.6)" />
          <rect x="10" y="20" width="40" height="5" rx="1" fill="rgba(34,211,238,0.6)" />
          <rect x="10" y="30" width="40" height="5" rx="1" fill="rgba(34,211,238,0.6)" />
          <text x="30" y="64" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="rgba(34,211,238,0.9)">{["FILE", "SQL", "WEB", "EX"][i]}</text>
        </g>
      ))}

      {/* User workstations row */}
      {[130, 210, 290, 450, 530, 610].map((x) => (
        <g key={x} transform={`translate(${x}, 350)`}>
          <rect width="40" height="32" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
          <circle cx="20" cy="14" r="5" fill="rgba(168,85,247,0.6)" />
          <path d="M 8 26 Q 20 18 32 26" fill="rgba(168,85,247,0.4)" />
        </g>
      ))}

      {/* Pwned indicator on first workstation */}
      <g transform="translate(228, 348)">
        <circle r="10" fill="#fb7185" />
        <text y="3" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="white">!</text>
      </g>

      {/* Title chip */}
      <g transform="translate(40, 40)">
        <rect width="140" height="26" rx="13" fill="rgba(168,85,247,0.18)" stroke="rgba(168,85,247,0.4)" />
        <text x="70" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="rgba(168,85,247,0.95)">corp.local</text>
      </g>

      <g transform="translate(620, 410)">
        <rect width="140" height="26" rx="13" fill="rgba(251,113,133,0.18)" stroke="rgba(251,113,133,0.4)" />
        <text x="70" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="rgba(251,113,133,0.95)">user → DA in 47h</text>
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  3. Burp Suite for Beginners                                 */
/* ============================================================ */

function BurpSuite({ className }: IllustrationProps) {
  const id = "burp";
  return (
    <Frame id={id} className={className}>
      <circle cx="400" cy="225" r="240" fill={`url(#${id}-glow-cyan)`} />

      {/* Browser window */}
      <g>
        <rect x="60" y="80" width="280" height="220" rx="10" fill="rgba(10,10,18,0.92)" stroke="rgba(255,255,255,0.18)" />
        <rect x="60" y="80" width="280" height="22" rx="10" fill="rgba(255,255,255,0.04)" />
        <circle cx="76" cy="91" r="3" fill="#fb7185" />
        <circle cx="86" cy="91" r="3" fill="#fbbf24" />
        <circle cx="96" cy="91" r="3" fill="#4ade80" />
        <rect x="115" y="86" width="180" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
        <text x="125" y="93" fontSize="7" fontFamily="monospace" fill="rgba(34,211,238,0.7)">https://api.target.com</text>

        {/* Form mockup */}
        <rect x="80" y="120" width="240" height="14" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="80" y="142" width="240" height="14" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="80" y="164" width="240" height="14" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="80" y="190" width="80" height="22" rx="4" fill="url(#burp-cyan)" />
        <text x="120" y="204" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="bold">SEND</text>
        <rect x="80" y="226" width="240" height="50" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
        <text x="92" y="244" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">{`{ "id": 4011, "user": "alice" }`}</text>
        <text x="92" y="258" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">{`{ "amount": 12500, "vendor": "AWS" }`}</text>
        <text x="92" y="272" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">{`{ "status": "approved" }`}</text>
      </g>

      {/* Burp interception center */}
      <g transform="translate(360, 145)">
        <rect width="80" height="160" rx="10" fill="url(#burp-amber)" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" />
        <text x="40" y="20" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="rgba(0,0,0,0.7)">BURP</text>
        <text x="40" y="32" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="rgba(0,0,0,0.55)">INTERCEPT</text>
        <line x1="10" y1="40" x2="70" y2="40" stroke="rgba(0,0,0,0.3)" />
        {[55, 70, 85, 100, 115, 130, 145].map((y, i) => (
          <rect
            key={y}
            x="10"
            y={y}
            width={i % 2 === 0 ? 60 : 45}
            height="5"
            rx="1"
            fill={i === 2 ? "rgba(251,113,133,0.9)" : "rgba(0,0,0,0.4)"}
          />
        ))}
      </g>

      {/* Server target */}
      <g transform="translate(560, 130)">
        <rect width="180" height="200" rx="10" fill="rgba(10,10,18,0.92)" stroke="rgba(168,85,247,0.4)" />
        {/* server stack */}
        {[15, 50, 85, 120, 155].map((y, i) => (
          <g key={y}>
            <rect x="20" y={y} width="140" height="28" rx="3" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" />
            <circle cx="32" cy={y + 14} r="3" fill={i === 1 ? "#4ade80" : i === 2 ? "#fb7185" : "#22d3ee"} />
            <rect x="42" y={y + 11} width={60 + i * 8} height="6" rx="1" fill="rgba(255,255,255,0.12)" />
            <text x="148" y={y + 17} textAnchor="end" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.4)">/api/v{i + 1}</text>
          </g>
        ))}
      </g>

      {/* Arrows between */}
      <g stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" markerEnd="url(#burp-arrow)" fill="none">
        <line x1="340" y1="200" x2="360" y2="200" />
        <line x1="440" y1="220" x2="560" y2="220" />
      </g>
      <defs>
        <marker id="burp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="rgba(34,211,238,0.9)" />
        </marker>
      </defs>

      {/* Labels */}
      <text x="200" y="335" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.5)">BROWSER</text>
      <text x="400" y="335" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(251,191,36,0.85)">PROXY</text>
      <text x="650" y="350" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(168,85,247,0.85)">TARGET</text>

      <g transform="translate(40, 40)">
        <rect width="170" height="26" rx="13" fill="rgba(34,211,238,0.18)" stroke="rgba(34,211,238,0.4)" />
        <text x="85" y="17" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="rgba(34,211,238,0.95)">127.0.0.1:8080</text>
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  4. Nmap Cheatsheet                                          */
/* ============================================================ */

function Nmap({ className }: IllustrationProps) {
  const id = "nmap";
  return (
    <Frame id={id} className={className}>
      <circle cx="180" cy="225" r="220" fill={`url(#${id}-glow-cyan)`} />
      <circle cx="620" cy="225" r="220" fill={`url(#${id}-glow-purple)`} />

      {/* Scanner laptop on left */}
      <g transform="translate(70, 160)">
        <rect width="180" height="120" rx="10" fill="rgba(10,10,18,0.92)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        <rect x="10" y="10" width="160" height="100" rx="4" fill="rgba(34,211,238,0.05)" />
        <text x="20" y="28" fontSize="8" fontFamily="monospace" fill="#22d3ee">$ nmap -sS -sV -p-</text>
        <text x="20" y="42" fontSize="8" fontFamily="monospace" fill="rgba(74,222,128,0.85)">10.10.0.0/24</text>
        <text x="20" y="60" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.5)">PORT  STATE   SERVICE</text>
        <text x="20" y="72" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">22    open    ssh</text>
        <text x="20" y="84" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">80    open    http</text>
        <text x="20" y="96" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.7)">445   open    smb</text>
        <rect x="-10" y="120" width="200" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
      </g>

      {/* Scan beams */}
      {[
        { y: 110, color: "rgba(34,211,238,0.6)", dash: "4 3" },
        { y: 170, color: "rgba(168,85,247,0.6)", dash: "8 4" },
        { y: 230, color: "rgba(251,191,36,0.6)", dash: "2 2" },
        { y: 290, color: "rgba(74,222,128,0.6)", dash: "6 3" },
        { y: 350, color: "rgba(251,113,133,0.6)", dash: "10 4" },
      ].map((beam) => (
        <line
          key={beam.y}
          x1="260"
          y1="220"
          x2="540"
          y2={beam.y}
          stroke={beam.color}
          strokeWidth="1.5"
          strokeDasharray={beam.dash}
          markerEnd="url(#nmap-arrow)"
        />
      ))}
      <defs>
        <marker id="nmap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="rgba(34,211,238,0.9)" />
        </marker>
      </defs>

      {/* Targets — port grid */}
      <g transform="translate(540, 80)">
        <text y="-5" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.5)">10.10.0.0/24</text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row} transform={`translate(0, ${row * 50})`}>
            {Array.from({ length: 5 }).map((_, col) => {
              const open = (row * 5 + col) % 4 === 0;
              const filt = (row * 5 + col) % 7 === 0;
              return (
                <g key={col} transform={`translate(${col * 38}, 0)`}>
                  <rect
                    width="32"
                    height="40"
                    rx="4"
                    fill={open ? "rgba(74,222,128,0.18)" : filt ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)"}
                    stroke={open ? "rgba(74,222,128,0.6)" : filt ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.15)"}
                  />
                  <circle cx="16" cy="14" r="4" fill={open ? "#4ade80" : filt ? "#fbbf24" : "rgba(255,255,255,0.25)"} />
                  <text x="16" y="32" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.5)">
                    {open ? `:${[22, 80, 443, 445, 3389][col]}` : "—"}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </g>

      {/* Scan radar at center bottom */}
      <g transform="translate(400, 410)">
        <circle r="14" fill="none" stroke="rgba(34,211,238,0.4)" />
        <circle r="9" fill="none" stroke="rgba(34,211,238,0.6)" />
        <circle r="4" fill="rgba(34,211,238,0.85)" />
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  5. AD Pentest Guide India                                   */
/* ============================================================ */

function ADPentestIndia({ className }: IllustrationProps) {
  const id = "adi";
  return (
    <Frame id={id} className={className}>
      <circle cx="400" cy="225" r="280" fill={`url(#${id}-glow-purple)`} />

      {/* Tricolor band on left edge */}
      <g>
        <rect x="0" y="0" width="6" height="150" fill="#ff9933" />
        <rect x="0" y="150" width="6" height="150" fill="#ffffff" opacity="0.85" />
        <rect x="0" y="300" width="6" height="150" fill="#138808" />
        <circle cx="3" cy="225" r="6" fill="#000080" />
      </g>

      {/* Forest = two domains */}
      {/* Forest root */}
      <g transform="translate(370, 70)">
        <rect width="60" height="60" rx="10" fill="url(#adi-amber)" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" />
        <path d="M 18 18 L 42 18 L 42 24 L 30 32 L 30 42 M 18 24 L 28 32" stroke="rgba(0,0,0,0.55)" strokeWidth="2" fill="none" />
        <text x="30" y="80" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(251,191,36,0.95)">Forest Root</text>
      </g>

      {/* Two child domains */}
      {[
        { x: 180, label: "MUMBAI", tone: "cyan" },
        { x: 560, label: "DUBAI", tone: "purple" },
      ].map((dom) => (
        <g key={dom.label} transform={`translate(${dom.x}, 180)`}>
          <rect width="60" height="60" rx="10" fill={`url(#adi-${dom.tone})`} stroke={dom.tone === "cyan" ? "rgba(34,211,238,0.7)" : "rgba(168,85,247,0.7)"} strokeWidth="1.5" />
          <rect x="10" y="14" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
          <rect x="10" y="24" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
          <rect x="10" y="34" width="40" height="6" rx="1" fill="rgba(0,0,0,0.4)" />
          <text x="30" y="80" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={dom.tone === "cyan" ? "rgba(34,211,238,0.95)" : "rgba(168,85,247,0.95)"}>{dom.label}</text>
        </g>
      ))}

      {/* trust lines */}
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none">
        <path d="M 380 130 L 230 180" />
        <path d="M 420 130 L 580 180" />
      </g>

      {/* Workstations under each */}
      {[140, 200, 260, 540, 600].map((x) => (
        <g key={x} transform={`translate(${x}, 290)`}>
          <rect width="40" height="32" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
          <circle cx="20" cy="14" r="5" fill="rgba(168,85,247,0.6)" />
          <path d="M 8 26 Q 20 18 32 26" fill="rgba(168,85,247,0.4)" />
        </g>
      ))}

      {/* Compromise marker */}
      <g transform="translate(225, 285)">
        <circle r="11" fill="#fb7185" />
        <text y="3" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="white">!</text>
      </g>

      {/* Attack chain */}
      <g stroke="#fb7185" strokeWidth="2.5" strokeDasharray="6 4" fill="none">
        <path d="M 225 295 L 210 240 L 380 130" markerEnd="url(#adi-arrow)" />
      </g>
      <defs>
        <marker id="adi-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#fb7185" />
        </marker>
      </defs>

      {/* CERT-In chip */}
      <g transform="translate(580, 410)">
        <rect width="170" height="26" rx="13" fill="rgba(34,211,238,0.18)" stroke="rgba(34,211,238,0.5)" />
        <circle cx="14" cy="13" r="4" fill="#22d3ee" />
        <text x="100" y="17" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(34,211,238,0.95)">CERT-In Empanelled</text>
      </g>

      <g transform="translate(40, 410)">
        <rect width="200" height="26" rx="13" fill="rgba(168,85,247,0.18)" stroke="rgba(168,85,247,0.4)" />
        <text x="100" y="17" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(168,85,247,0.95)">82% engagements → Domain Admin</text>
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  6. CRTO vs OSCP                                             */
/* ============================================================ */

function CertVersus({
  className,
  left,
  right,
  leftSub,
  rightSub,
}: IllustrationProps & {
  left: string;
  right: string;
  leftSub: string;
  rightSub: string;
}) {
  const id = `vs-${left.toLowerCase()}`;
  return (
    <Frame id={id} className={className}>
      <circle cx="220" cy="225" r="220" fill={`url(#${id}-glow-cyan)`} />
      <circle cx="580" cy="225" r="220" fill={`url(#${id}-glow-purple)`} />

      {/* Left badge */}
      <g transform="translate(150, 130)">
        {/* OSCP-like circular */}
        <circle cx="70" cy="70" r="80" fill="rgba(10,10,18,0.85)" stroke="url(#vs-oscp-cyan)" strokeWidth="3" />
        <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
        <circle cx="70" cy="70" r="50" fill="url(#vs-oscp-cyan)" />
        <text x="70" y="64" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white">{left}</text>
        <text x="70" y="80" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.85)">{leftSub}</text>
        {/* Ribbon */}
        <path d="M 35 145 L 105 145 L 95 165 L 45 165 Z" fill="url(#vs-oscp-cyan)" />
      </g>

      {/* VS center */}
      <g transform="translate(400, 200)">
        <circle r="40" fill="rgba(10,10,18,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <text textAnchor="middle" y="8" fontSize="32" fontFamily="monospace" fontWeight="bold" fill="url(#vs-oscp-amber)">VS</text>
        {/* sparks */}
        <g stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
          <line x1="-55" y1="0" x2="-44" y2="0" />
          <line x1="44" y1="0" x2="55" y2="0" />
          <line x1="0" y1="-55" x2="0" y2="-44" />
          <line x1="0" y1="44" x2="0" y2="55" />
          <line x1="-40" y1="-40" x2="-32" y2="-32" />
          <line x1="40" y1="40" x2="32" y2="32" />
          <line x1="40" y1="-40" x2="32" y2="-32" />
          <line x1="-40" y1="40" x2="-32" y2="32" />
        </g>
      </g>

      {/* Right badge */}
      <g transform="translate(510, 130)">
        {/* CRTO-like hex/shield */}
        <path
          d="M 70 0 L 130 30 L 130 110 L 70 140 L 10 110 L 10 30 Z"
          fill="rgba(10,10,18,0.85)"
          stroke="url(#vs-oscp-purple)"
          strokeWidth="3"
        />
        <path
          d="M 70 14 L 116 38 L 116 102 L 70 126 L 24 102 L 24 38 Z"
          fill="none"
          stroke="rgba(168,85,247,0.3)"
          strokeWidth="1"
        />
        <path
          d="M 70 28 L 102 46 L 102 94 L 70 112 L 38 94 L 38 46 Z"
          fill="url(#vs-oscp-purple)"
        />
        <text x="70" y="64" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white">{right}</text>
        <text x="70" y="80" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.85)">{rightSub}</text>
        {/* Ribbon */}
        <path d="M 35 145 L 105 145 L 95 165 L 45 165 Z" fill="url(#vs-oscp-purple)" />
      </g>
    </Frame>
  );
}

/* CRTO vs OSCP wrapper to align with custom slug */
function CrtoVsOscp({ className }: IllustrationProps) {
  return (
    <CertVersus
      className={className}
      left="OSCP"
      right="CRTO"
      leftSub="OffSec · 24h"
      rightSub="ZPS · 48h"
    />
  );
}

function CptsVsOscp({ className }: IllustrationProps) {
  return (
    <CertVersus
      className={className}
      left="OSCP"
      right="CPTS"
      leftSub="OffSec · 24h"
      rightSub="HTB · 7d"
    />
  );
}

function CrtpVsCrte({ className }: IllustrationProps) {
  return (
    <CertVersus
      className={className}
      left="CRTP"
      right="CRTE"
      leftSub="AD · entry"
      rightSub="AD · expert"
    />
  );
}

/* ============================================================ */
/*  7. MCP Server Security                                      */
/* ============================================================ */

function MCPServerSecurity({ className }: IllustrationProps) {
  const id = "mcp";
  return (
    <Frame id={id} className={className}>
      <circle cx="200" cy="225" r="240" fill={`url(#${id}-glow-cyan)`} />
      <circle cx="600" cy="225" r="240" fill={`url(#${id}-glow-purple)`} />

      {/* AI brain on left */}
      <g transform="translate(80, 140)">
        <rect width="170" height="170" rx="22" fill="rgba(10,10,18,0.92)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        {/* brain hemispheres */}
        <g transform="translate(85, 80)">
          <path d="M -40 0 Q -55 -30 -25 -45 Q -10 -55 5 -42 Q -5 -35 -8 -22 Q -12 -10 -25 -5 Q -38 0 -40 0 Z" fill="url(#mcp-cyan)" />
          <path d="M 40 0 Q 55 -30 25 -45 Q 10 -55 -5 -42 Q 5 -35 8 -22 Q 12 -10 25 -5 Q 38 0 40 0 Z" fill="url(#mcp-cyan)" />
          {/* circuit dots */}
          <circle cx="-22" cy="-30" r="2" fill="#fff" />
          <circle cx="-12" cy="-15" r="2" fill="#fff" />
          <circle cx="22" cy="-30" r="2" fill="#fff" />
          <circle cx="12" cy="-15" r="2" fill="#fff" />
          {/* connections */}
          <line x1="-22" y1="-30" x2="-12" y2="-15" stroke="rgba(255,255,255,0.5)" />
          <line x1="22" y1="-30" x2="12" y2="-15" stroke="rgba(255,255,255,0.5)" />
        </g>
        <text x="85" y="148" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(34,211,238,0.95)">LLM AGENT</text>
      </g>

      {/* MCP Server middle */}
      <g transform="translate(310, 100)">
        <rect width="180" height="250" rx="14" fill="rgba(10,10,18,0.92)" stroke="rgba(168,85,247,0.55)" strokeWidth="1.5" />
        <rect x="10" y="14" width="160" height="22" rx="4" fill="rgba(168,85,247,0.18)" />
        <text x="90" y="29" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="rgba(168,85,247,0.95)">MCP SERVER</text>

        {/* tool slots */}
        {[
          { y: 50, label: "fetch_logs()", tone: "amber" },
          { y: 80, label: "read_file()", tone: "amber" },
          { y: 110, label: "exec_query()", tone: "rose" },
          { y: 140, label: "send_email()", tone: "cyan" },
          { y: 170, label: "list_users()", tone: "cyan" },
          { y: 200, label: "translate()", tone: "purple" },
        ].map((tool) => (
          <g key={tool.label}>
            <rect
              x="14"
              y={tool.y}
              width="152"
              height="22"
              rx="4"
              fill={`rgba(255,255,255,0.04)`}
              stroke={
                tool.tone === "rose"
                  ? "rgba(251,113,133,0.6)"
                  : "rgba(255,255,255,0.12)"
              }
            />
            <circle cx="24" cy={tool.y + 11} r="3" fill={`url(#mcp-${tool.tone})`} />
            <text x="34" y={tool.y + 15} fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.85)">{tool.label}</text>
            {tool.tone === "rose" && (
              <text x="158" y={tool.y + 15} textAnchor="end" fontSize="7" fontFamily="monospace" fill="#fb7185">RCE</text>
            )}
            {tool.tone === "purple" && (
              <text x="158" y={tool.y + 15} textAnchor="end" fontSize="7" fontFamily="monospace" fill="#a855f7">poison</text>
            )}
          </g>
        ))}
      </g>

      {/* Downstream systems */}
      <g transform="translate(560, 110)">
        {[
          { y: 0, label: "FS", tone: "cyan", icon: "📁" },
          { y: 80, label: "API", tone: "amber", icon: "🌐" },
          { y: 160, label: "shell", tone: "rose", icon: "$_" },
        ].map((sys) => (
          <g key={sys.label} transform={`translate(0, ${sys.y})`}>
            <rect width="160" height="60" rx="10" fill={`url(#mcp-${sys.tone})`} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="80" y="32" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="white">{sys.label}</text>
            <text x="80" y="46" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.7)">{sys.icon}</text>
          </g>
        ))}
      </g>

      {/* connections */}
      <g stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="none" markerEnd="url(#mcp-arrow)">
        <line x1="250" y1="225" x2="310" y2="225" />
        <line x1="490" y1="180" x2="560" y2="140" />
        <line x1="490" y1="220" x2="560" y2="220" />
        <line x1="490" y1="260" x2="560" y2="300" strokeDasharray="5 4" stroke="#fb7185" />
      </g>
      <defs>
        <marker id="mcp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="rgba(168,85,247,0.9)" />
        </marker>
      </defs>

      {/* Warning */}
      <g transform="translate(630, 60)">
        <path d="M 14 0 L 28 24 L 0 24 Z" fill="#fb7185" />
        <text x="14" y="20" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="bold" fill="white">!</text>
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  8. ECIH vs GCIH                                             */
/* ============================================================ */

function ECIHvsGCIH({ className }: IllustrationProps) {
  const id = "ecih";
  return (
    <Frame id={id} className={className}>
      <circle cx="220" cy="225" r="220" fill={`url(#${id}-glow-cyan)`} />
      <circle cx="580" cy="225" r="220" fill={`url(#${id}-glow-purple)`} />

      {/* Left badge — ECIH (shield) */}
      <g transform="translate(120, 110)">
        <path d="M 80 0 L 160 25 L 160 95 Q 160 135 80 175 Q 0 135 0 95 L 0 25 Z" fill="rgba(10,10,18,0.85)" stroke="url(#ecih-cyan)" strokeWidth="3" />
        <path d="M 80 18 L 142 38 L 142 92 Q 142 122 80 152 Q 18 122 18 92 L 18 38 Z" fill="none" stroke="rgba(34,211,238,0.3)" />
        <path d="M 80 32 L 130 50 L 130 88 Q 130 112 80 134 Q 30 112 30 88 L 30 50 Z" fill="url(#ecih-cyan)" />
        <text x="80" y="78" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white">ECIH</text>
        <text x="80" y="94" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.85)">EC-COUNCIL</text>
        <text x="80" y="190" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(34,211,238,0.85)">~₹50,000</text>
      </g>

      {/* Right badge — GCIH (octagon) */}
      <g transform="translate(520, 110)">
        <path d="M 50 0 L 110 0 L 160 50 L 160 110 L 110 160 L 50 160 L 0 110 L 0 50 Z" fill="rgba(10,10,18,0.85)" stroke="url(#ecih-purple)" strokeWidth="3" />
        <path d="M 56 14 L 104 14 L 146 56 L 146 104 L 104 146 L 56 146 L 14 104 L 14 56 Z" fill="none" stroke="rgba(168,85,247,0.3)" />
        <path d="M 60 28 L 100 28 L 132 60 L 132 100 L 100 132 L 60 132 L 28 100 L 28 60 Z" fill="url(#ecih-purple)" />
        <text x="80" y="78" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white">GCIH</text>
        <text x="80" y="94" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.85)">GIAC · SANS</text>
        <text x="80" y="190" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(168,85,247,0.85)">~₹6,18,000</text>
      </g>

      {/* IR lifecycle ribbon */}
      <g transform="translate(40, 380)">
        {["Prepare", "Identify", "Contain", "Eradicate", "Recover"].map((phase, i) => (
          <g key={phase} transform={`translate(${i * 145}, 0)`}>
            <rect width="120" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(34,211,238,0.3)" />
            <circle cx="14" cy="12" r="5" fill={["#22d3ee", "#a855f7", "#fbbf24", "#fb7185", "#4ade80"][i]} />
            <text x="65" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.8)">{phase}</text>
          </g>
        ))}
      </g>

      {/* VS in middle */}
      <g transform="translate(400, 190)">
        <text textAnchor="middle" y="8" fontSize="34" fontFamily="monospace" fontWeight="bold" fill="rgba(255,255,255,0.25)">VS</text>
      </g>
    </Frame>
  );
}

/* ============================================================ */
/*  Registry                                                    */
/* ============================================================ */

const REGISTRY: Record<Slug, (props: IllustrationProps) => React.ReactElement> = {
  "soc-200-osda-exam-tips-2026": SocAnalyst,
  "windows-ad-attack-cheatsheet-2026": ADCheatsheet,
  "burp-suite-for-beginners-2026": BurpSuite,
  "nmap-cheatsheet-2026": Nmap,
  "active-directory-pentest-guide-india-2026": ADPentestIndia,
  "crto-vs-oscp-honest-comparison-2026": CrtoVsOscp,
  "mcp-server-security-how-hacked-2026": MCPServerSecurity,
  "ecih-vs-gcih-incident-handler-certification-2026": ECIHvsGCIH,
  "cpts-vs-oscp-certification-comparison-india-2026": CptsVsOscp,
  "crtp-vs-crte-certification-guide-india-2026": CrtpVsCrte,
};

export function BlogIllustration({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Component = REGISTRY[slug as Slug];
  if (!Component) return null;
  return <Component className={className} />;
}

export function hasIllustration(slug: string): boolean {
  return slug in REGISTRY;
}
