"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageWrapper";

/* Wrap a same-origin SPA navigation in the View Transitions API so the
 * dark listing cross-fades into the white article (Chrome/Edge 126+).
 * Falls back to a normal router push on browsers without support. */
function navigateWithTransition(router: ReturnType<typeof useRouter>, href: string) {
  type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };
  const doc = document as DocWithVT;
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(() => router.push(href));
  } else {
    router.push(href);
  }
}

const EASE = [0.22, 1, 0.36, 1] as const;

type GraphicVariant = "signal" | "flow" | "agent" | "image";

type LogoTool = { name: string; src: string };

/* ── AI agent themed logo set: model + runtime + human surface + memory ── */
const AGENT_TOOLS: LogoTool[] = [
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "n8n", src: "/logos/n8n.svg" },
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
];

const blogs: {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  graphic: GraphicVariant;
  logos?: LogoTool[];
  image?: string;
}[] = [
  {
    slug: "future-of-b2b-gtm-2026",
    title: "The future of B2B GTM",
    excerpt:
      "Cursor reached $100M ARR in one year with 19 employees. SaaStr now runs the same revenue with 1.2 humans and 20 AI agents. Cold email reply rates collapsed from 6.8% to 3.43%. Around 81% of B2B buying happens before sales is contacted. The old SaaS playbook of large SDR pods, MQL targets, and last click attribution is breaking. Here is what is replacing it, what is actively failing, and what to watch for.",
    tag: "GTM Strategy",
    author: "Danny",
    date: "May 22, 2026",
    readTime: "12 min read",
    graphic: "image",
    image: "/images/future-gtm-card.png",
  },
  {
    slug: "ai-agents-gtm-stack-2026",
    title: "How AI agents actually work in B2B GTM",
    excerpt:
      "Salesforce says 92% of sellers with AI agents see prospecting gains. McKinsey says fewer than 10% have scaled them. Gartner says ~130 of the thousands of agentic vendors are real. All three are true at once. Here is what an AI agent in B2B GTM actually is, how it works under the hood, why most autonomous SDR projects still fail, and the stack pattern that wins in 2026.",
    tag: "Agent Architecture",
    author: "Danny",
    date: "May 8, 2026",
    readTime: "9 min read",
    graphic: "agent",
  },
  {
    slug: "signal-arbitration-b2b-outbound",
    title: "How signal arbitration breaks most AI outbound stacks",
    excerpt:
      "When three buying signals fire on the same account in the same week, three teams end up running three different plays. Signal arbitration is the decision layer that turns that mess into one coherent next action.",
    tag: "Signal Architecture",
    author: "Danny",
    date: "May 1, 2026",
    readTime: "7 min read",
    graphic: "flow",
  },
  {
    slug: "outbound-2026-gtm-systems-problem",
    title: "Why outbound stopped working in 2026",
    excerpt:
      "Outbound in 2026 fails because most B2B teams keep treating it as a messaging exercise when it is actually a systems exercise. Timing, signals, deliverability, and AI all have to work as one decision layer.",
    tag: "GTM Strategy",
    author: "Danny",
    date: "Apr 24, 2026",
    readTime: "8 min read",
    graphic: "signal",
  },
];

type Blog = (typeof blogs)[number];

/* ── Brand logos (real, full-color marks) ── */
const TECH_TOOLS: { name: string; src: string }[] = [
  { name: "Instantly", src: "/logos/instantly.svg" },
  { name: "Apollo", src: "/logos/apollo.svg" },
  { name: "HeyReach", src: "/logos/heyreach.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
];

/* ── Orbital ring graphic (signal card) ── */
function OrbitalGraphic() {
  const cx = 200;
  const cy = 125;
  const radii = [45, 80, 115, 150, 185];

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="glow-signal" cx="85%" cy="0%" r="55%">
          <stop offset="0%" stopColor="rgba(232,86,0,0.4)" />
          <stop offset="50%" stopColor="rgba(232,86,0,0.06)" />
          <stop offset="100%" stopColor="rgba(232,86,0,0)" />
        </radialGradient>
        <pattern id="grid-signal" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="400" height="250" fill="url(#grid-signal)" />
      <rect width="400" height="250" fill="url(#glow-signal)" />

      {radii.map((r, i) => (
        <motion.circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}

      <circle cx={cx} cy={cy} r="3" fill="#E8650A" />
      <motion.circle
        cx={cx}
        cy={cy}
        r="3"
        fill="none"
        stroke="#E8650A"
        strokeWidth="1.5"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 5, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </svg>
  );
}

/* ── Glowing orange ball that travels around the orbit ring ── */
function OrbitingBall({ radius = 80, duration = 14 }: { radius?: number; duration?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: "50%", top: "50%", width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style={{
          left: radius,
          top: 0,
          background: "#E8650A",
          boxShadow:
            "0 0 18px 4px rgba(232,86,0,0.7), 0 0 36px 8px rgba(232,86,0,0.35)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ── Nested-curves graphic (flow card) — two clusters of stacked parenthetic hooks ── */
function CurvesGraphic() {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="glow-flow" cx="85%" cy="0%" r="55%">
          <stop offset="0%" stopColor="rgba(232,86,0,0.42)" />
          <stop offset="50%" stopColor="rgba(232,86,0,0.06)" />
          <stop offset="100%" stopColor="rgba(232,86,0,0)" />
        </radialGradient>
        <pattern id="grid-flow" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="400" height="250" fill="url(#grid-flow)" />
      <rect width="400" height="250" fill="url(#glow-flow)" />

      {/* Left cluster — '(' shapes nested at diagonal offset */}
      {Array.from({ length: 7 }).map((_, i) => {
        const offX = i * 9;
        const offY = i * 15;
        const sx = 95 + offX;
        const sy = 55 + offY;
        const ey = sy + 95;
        const cx2 = sx - 28;
        const cy2 = sy + 47;
        return (
          <motion.path
            key={`L${i}`}
            d={`M ${sx} ${sy} Q ${cx2} ${cy2}, ${sx} ${ey}`}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: i * 0.08, ease: EASE }}
          />
        );
      })}

      {/* Right cluster — ')' shapes nested at diagonal offset, mirrored */}
      {Array.from({ length: 7 }).map((_, i) => {
        const offX = i * 9;
        const offY = i * 15;
        const sx = 245 + offX;
        const sy = 65 + offY;
        const ey = sy + 95;
        const cx2 = sx + 28;
        const cy2 = sy + 47;
        return (
          <motion.path
            key={`R${i}`}
            d={`M ${sx} ${sy} Q ${cx2} ${cy2}, ${sx} ${ey}`}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.08, ease: EASE }}
          />
        );
      })}

      {/* Single orange highlight curve — bridges the two clusters, loops */}
      <motion.path
        d="M 130 110 Q 200 75, 270 130"
        fill="none"
        stroke="#E8650A"
        strokeWidth="1.4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 1],
        }}
      />
    </svg>
  );
}

/* ── Logos that ACTUALLY orbit around the center, staying upright (signal card only) ── */
function OrbitingLogos({ tools = TECH_TOOLS }: { tools?: LogoTool[] }) {
  const radius = 95;
  const duration = 30;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: "50%", top: "50%", width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {tools.map((tool, i) => {
        const angle = (i * 360) / tools.length - 90;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={tool.name}
            className="absolute pointer-events-auto"
            style={{ left: x, top: y, width: 0, height: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.1,
                duration: 0.7,
                ease: EASE,
              }}
              whileHover={{ scale: 1.18 }}
              className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#161619] border border-[#2a2a30] hover:border-[#E8650A] hover:shadow-[0_0_18px_rgba(232,86,0,0.45)] flex items-center justify-center transition-[border-color,box-shadow] duration-300 overflow-hidden"
              aria-label={tool.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.src}
                alt={tool.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain opacity-80"
                style={{ filter: "brightness(0) invert(0.82)" }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Lighter, static-floating logos for the curves (flow) card ── */
function CurvesLogos({ tools = TECH_TOOLS }: { tools?: LogoTool[] }) {
  const positions = [
    { left: "22%", top: "28%" },
    { left: "70%", top: "26%" },
    { left: "32%", top: "78%" },
    { left: "78%", top: "76%" },
  ];

  return (
    <>
      {tools.map((tool, i) => (
        <motion.div
          key={tool.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#101013] border border-[#1f1f24] hover:border-[#E8650A] hover:shadow-[0_0_14px_rgba(232,86,0,0.4)] flex items-center justify-center transition-[border-color,box-shadow] duration-300 z-10 overflow-hidden"
          style={positions[i]}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { delay: 0.5 + i * 0.1, duration: 0.7, ease: EASE },
            scale: { delay: 0.5 + i * 0.1, duration: 0.7, ease: EASE },
            y: { duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
          }}
          whileHover={{ scale: 1.15 }}
          aria-label={tool.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.src}
            alt={tool.name}
            width={16}
            height={16}
            className="w-4 h-4 object-contain opacity-75"
            style={{ filter: "brightness(0) invert(0.82)" }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      ))}
    </>
  );
}

/* ── AI Agent graphic: central agent with 4 capability nodes (model, tools, memory, governance) ── */
function AgentGraphic() {
  const cx = 200;
  const cy = 125;

  /* Node positions for the 4 capabilities. Match AgentNodes percentage positions. */
  const nodes = [
    { x: 105, y: 65, delay: 0.3 },
    { x: 295, y: 65, delay: 0.45 },
    { x: 105, y: 185, delay: 0.6 },
    { x: 295, y: 185, delay: 0.75 },
  ];

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="glow-agent" cx="85%" cy="0%" r="55%">
          <stop offset="0%" stopColor="rgba(232,86,0,0.42)" />
          <stop offset="50%" stopColor="rgba(232,86,0,0.06)" />
          <stop offset="100%" stopColor="rgba(232,86,0,0)" />
        </radialGradient>
        <pattern
          id="grid-agent"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.025)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="agent-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,86,0,1)" />
          <stop offset="60%" stopColor="rgba(232,86,0,0.55)" />
          <stop offset="100%" stopColor="rgba(232,86,0,0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="250" fill="url(#grid-agent)" />
      <rect width="400" height="250" fill="url(#glow-agent)" />

      {/* Concentric rings around center, gentle pulse */}
      {[35, 60, 90].map((r, i) => (
        <motion.circle
          key={`ring-${r}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.18, 0.42, 0.18] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Spokes connecting center to each node */}
      {nodes.map((node, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke="rgba(232,86,0,0.42)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.3,
            delay: node.delay,
            ease: EASE,
          }}
        />
      ))}

      {/* Data pulses traveling from center to each node and back */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`pulse-${i}`}
          r="2.6"
          fill="#E8650A"
          initial={{ cx, cy, opacity: 0 }}
          animate={{
            cx: [cx, node.x, cx],
            cy: [cy, node.y, cy],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8 + i * 0.6,
            times: [0, 0.45, 0.55, 1],
          }}
          style={{ filter: "drop-shadow(0 0 5px rgba(232,86,0,0.85))" }}
        />
      ))}

      {/* Central agent core with halo */}
      <circle cx={cx} cy={cy} r="14" fill="url(#agent-core)" opacity="0.6" />
      <circle cx={cx} cy={cy} r="5" fill="#E8650A" />
      <motion.circle
        cx={cx}
        cy={cy}
        r="5"
        fill="none"
        stroke="#E8650A"
        strokeWidth="1.5"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 4.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </svg>
  );
}

/* ── Inline icons used inside the 4 capability nodes ── */
function AgentNodeIcon({ variant }: { variant: "model" | "tools" | "memory" | "governance" }) {
  const stroke = "rgba(255,255,255,0.85)";
  switch (variant) {
    case "model":
      // Sparkle (4-point star) for the reasoning model
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 L13.2 10 L20 11.2 L13.2 12.4 L12 19 L10.8 12.4 L4 11.2 L10.8 10 Z"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tools":
      // Wrench-like simplified path for the toolset
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1Z"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "memory":
      // Database cylinder for memory
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke={stroke} strokeWidth="1.4" />
          <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" stroke={stroke} strokeWidth="1.4" />
          <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case "governance":
      // Shield outline for governance
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 L4 6 V12 C4 16.5 7 20 12 21 C17 20 20 16.5 20 12 V6 L12 3 Z"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Node badges around the agent core (model, tools, memory, governance) ── */
function AgentNodes() {
  /* Match positions to the SVG node coords above (105,65) (295,65) (105,185) (295,185)
   * In percentages of the 400x250 viewBox: ~26%, ~26% / ~74%, ~26% / ~26%, ~74% / ~74%, ~74% */
  const nodes: {
    left: string;
    top: string;
    icon: "model" | "tools" | "memory" | "governance";
    label: string;
  }[] = [
    { left: "26%", top: "26%", icon: "model", label: "Model" },
    { left: "74%", top: "26%", icon: "tools", label: "Tools" },
    { left: "26%", top: "74%", icon: "memory", label: "Memory" },
    { left: "74%", top: "74%", icon: "governance", label: "Governance" },
  ];

  return (
    <>
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#161619] border border-[#2a2a30] hover:border-[#E8650A] hover:shadow-[0_0_18px_rgba(232,86,0,0.45)] flex items-center justify-center transition-[border-color,box-shadow] duration-300 z-10"
          style={{ left: node.left, top: node.top }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
          transition={{
            opacity: { delay: 0.6 + i * 0.15, duration: 0.7, ease: EASE },
            scale: { delay: 0.6 + i * 0.15, duration: 0.7, ease: EASE },
            y: {
              duration: 3.6 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            },
          }}
          whileHover={{ scale: 1.18 }}
          aria-label={node.label}
        >
          <AgentNodeIcon variant={node.icon} />
        </motion.div>
      ))}
    </>
  );
}

/* ── Photo card with Ken Burns motion, gradient overlay, and animated bar accent ── */
function FutureImageGraphic({ src }: { src: string }) {
  return (
    <>
      {/* Image with fade-in plus subtle continuous Ken Burns drift */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.05, 1], x: [0, -4, 0], y: [0, -2, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* Dark gradient at the bottom so card metadata reads cleanly underneath */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.05) 0%, rgba(8,8,10,0.18) 55%, rgba(8,8,10,0.55) 100%)",
        }}
      />

      {/* Orange glow accent in the top-right (matches the brand's other cards) */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none blur-[60px] opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(232,86,0,0.55), transparent 65%)",
        }}
      />

      {/* Animated rising bar-chart badge in the top-left (echoes the photo) */}
      <motion.div
        className="absolute top-3 left-3 px-2 py-1.5 rounded-md bg-black/45 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
      >
        <svg
          viewBox="0 0 60 32"
          width="56"
          height="22"
          aria-hidden="true"
        >
          {[
            { x: 4, max: 10 },
            { x: 17, max: 15 },
            { x: 30, max: 20 },
            { x: 43, max: 26 },
          ].map((bar, i) => (
            <motion.rect
              key={bar.x}
              x={bar.x}
              width="9"
              fill="#E8650A"
              rx="1.5"
              initial={{ y: 32, height: 0, opacity: 0 }}
              animate={{
                y: [32, 32 - bar.max, 32 - bar.max, 32],
                height: [0, bar.max, bar.max, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 + i * 0.18,
                times: [0, 0.22, 0.78, 1],
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Scanline pulse traveling across the bottom edge */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,86,0,0.85), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.6 }}
      />
    </>
  );
}

function BrandGraphic({
  variant,
  tools,
  image,
}: {
  variant: GraphicVariant;
  tools?: LogoTool[];
  image?: string;
}) {
  return (
    <div className="absolute inset-0 bg-[#08080a] overflow-hidden">
      {variant === "image" && image ? (
        <FutureImageGraphic src={image} />
      ) : variant === "agent" ? (
        <>
          <AgentGraphic />
          <AgentNodes />
        </>
      ) : variant === "signal" ? (
        <>
          <OrbitalGraphic />
          <OrbitingLogos tools={tools} />
        </>
      ) : (
        <>
          <CurvesGraphic />
          <CurvesLogos tools={tools} />
        </>
      )}
    </div>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "start 0.5"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  const href = `/blogs/${blog.slug}/`;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, filter }}
      transition={{ delay: index * 0.06, ease: EASE }}
    >
      <a
        href={href}
        onClick={(e) => {
          /* Open-in-new-tab modifiers should keep default behavior. */
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          navigateWithTransition(router, href);
        }}
        className="block group h-full relative"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="relative rounded-[20px] overflow-hidden h-full flex flex-col bg-[#0b0b0d] border border-white/[0.06] group-hover:border-white/[0.14] transition-colors duration-500"
        >
          <div className="w-full aspect-[16/10] relative overflow-hidden">
            <BrandGraphic
              variant={blog.graphic}
              tools={blog.logos}
              image={blog.image}
            />
          </div>

          <div className="p-7 flex flex-col flex-1">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-3">
              {blog.tag}
            </span>

            <h3 className="text-[22px] font-bold mb-3 leading-[1.3] text-white group-hover:text-[#E8650A] transition-colors duration-400">
              {blog.title}
            </h3>

            <p className="text-[14px] text-white/55 leading-[1.6] mb-6 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex items-center gap-2 text-[12px] text-white/45 font-medium mt-auto">
              <span className="text-white/70">{blog.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{blog.readTime}</span>
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.06]">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 group-hover:text-[#E8650A] transition-colors duration-400">
                <span>Read More</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-400"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function BlogsPage() {
  return (
    <main className="w-full bg-black">
      <Navigation />

      <PageHero
        badge="Blog"
        title="GTM Reads"
        subtitle="Deep dives into AI-orchestrated GTM, signal-led outbound, agent architecture, and founder strategy. No fluff, no SEO filler."
      />

      <section className="pb-32 pt-8">
        <div className="max-w-[1240px] mx-auto px-6">
          <div
            className={`grid gap-7 ${
              blogs.length === 1
                ? "grid-cols-1 max-w-[440px] mx-auto"
                : blogs.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-[920px] mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {blogs.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
