"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";

interface Node {
  label: string;
  resources: string[];
}

const NODES: Node[] = [
  { label: "lambda-execution-role", resources: ["s3:*", "kms:Decrypt"] },
  { label: "ec2-app-instance", resources: ["secretsmanager:*", "rds:Connect"] },
  { label: "iam:PassRole *", resources: ["sts:AssumeRole", "→ admin"] },
  { label: "ssm:PutParameter", resources: ["ssm:GetParameter", "secrets"] },
  { label: "iam:CreateAccessKey", resources: ["self", "→ persistence"] },
];

export function IamBlastRadius() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {/* center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative grid size-24 place-items-center rounded-2xl bg-red-500/15 ring-1 ring-red-400/50 shadow-[0_0_60px_rgba(248,113,113,0.35)]"
        >
          <KeyRound className="size-9 text-red-300" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-red-300">
            wildcard role
          </span>
        </motion.div>

        {/* pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-2xl ring-2 ring-red-400/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{
              duration: 2.4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* outer nodes */}
      {NODES.map((n, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 42;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.45 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-32"
            style={{ top: `${y}%`, left: `${x}%` }}
          >
            <div className="rounded-lg ring-1 ring-amber-400/30 bg-amber-400/10 backdrop-blur-sm px-2.5 py-2 text-center">
              <div className="font-mono text-[10px] font-bold text-amber-200 truncate">
                {n.label}
              </div>
              <div className="mt-1 font-mono text-[8px] text-fg-muted leading-tight">
                {n.resources.join(" · ")}
              </div>
            </div>
            {/* connector line drawn via positioned ::after - faked using flex */}
          </motion.div>
        );
      })}

      {/* connector SVG */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {NODES.map((_, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 36;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgba(248,113,113,0.35)"
              strokeWidth="0.4"
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
