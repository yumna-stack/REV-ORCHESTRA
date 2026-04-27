"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageWrapper";

const EASE = [0.22, 1, 0.36, 1] as const;

type GraphicVariant = "signal" | "flow";

const blogs: {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  graphic: GraphicVariant;
}[] = [
  {
    slug: "signal-arbitration-b2b-outbound",
    title: "How signal arbitration breaks most AI outbound stacks",
    excerpt:
      "When three buying signals fire on the same account in the same week, three teams end up running three different plays. Signal arbitration is the decision layer that turns that mess into one coherent next action.",
    tag: "Signal Architecture",
    author: "Danny",
    date: "May 1, 2026",
    readTime: "7 min read",
    graphic: "signal",
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
    graphic: "flow",
  },
];

type Blog = (typeof blogs)[number];

/* ── Real brand SVG paths (Simple Icons, monochrome rendering) ── */
const TECH_TOOLS = [
  {
    name: "HubSpot",
    path: (
      <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.84h-.067a2.2 2.2 0 0 0-2.193 2.2v.067a2.196 2.196 0 0 0 1.252 1.973l.013.005V7.93a6.225 6.225 0 0 0-2.969 1.31L5.482 3.151A2.487 2.487 0 1 0 1.96 4.587a2.49 2.49 0 0 0 1.04 1.46l-.011-.007 7.683 5.98a6.262 6.262 0 0 0-1.054 3.493 6.241 6.241 0 0 0 .92 3.265L8.198 21.092a2.034 2.034 0 0 0-.595-.092A2.027 2.027 0 1 0 9.6 23.018l-.001-.018v-.024a2.025 2.025 0 0 0-.179-.756l.005.012 2.314-2.317a6.213 6.213 0 0 0 4.05 1.5h.001a6.21 6.21 0 1 0 0-12.422l-.003-.001v-.001a6.22 6.22 0 0 0-1.733.249l.041-.011zm-1.054 9.32a3.187 3.187 0 1 1 0-6.376l.011.001a3.186 3.186 0 0 1-.001 6.373h-.012z" />
    ),
  },
  {
    name: "Slack",
    path: (
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    ),
  },
  {
    name: "Notion",
    path: (
      <g>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M8.5 17 V7 L15.5 17 V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    ),
  },
  {
    name: "GitHub",
    path: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
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
function OrbitingLogos() {
  const radius = 95;
  const duration = 30;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: "50%", top: "50%", width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {TECH_TOOLS.map((tool, i) => {
        const angle = (i * 360) / TECH_TOOLS.length - 90;
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
              className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#161619] border border-[#2a2a30] flex items-center justify-center text-white/65 hover:text-[#E8650A] hover:border-[#E8650A] transition-colors duration-300"
              aria-label={tool.name}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                {tool.path}
              </svg>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Lighter, static-floating logos for the curves (flow) card ── */
function CurvesLogos() {
  const positions = [
    { left: "22%", top: "28%" },
    { left: "70%", top: "26%" },
    { left: "32%", top: "78%" },
    { left: "78%", top: "76%" },
  ];

  return (
    <>
      {TECH_TOOLS.map((tool, i) => (
        <motion.div
          key={tool.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#101013] border border-[#1f1f24] flex items-center justify-center text-white/40 hover:text-[#E8650A] hover:border-[#E8650A] transition-colors duration-300 z-10"
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            {tool.path}
          </svg>
        </motion.div>
      ))}
    </>
  );
}

function BrandGraphic({ variant }: { variant: GraphicVariant }) {
  return (
    <div className="absolute inset-0 bg-[#08080a] overflow-hidden">
      {variant === "signal" ? (
        <>
          <OrbitalGraphic />
          <OrbitingLogos />
        </>
      ) : (
        <>
          <CurvesGraphic />
          <CurvesLogos />
        </>
      )}
    </div>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "start 0.5"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, filter }}
      transition={{ delay: index * 0.06, ease: EASE }}
    >
      <a
        href={`/blogs/${blog.slug}`}
        className="block group h-full relative"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="relative rounded-[20px] overflow-hidden h-full flex flex-col bg-[#0b0b0d] border border-white/[0.06] group-hover:border-white/[0.14] transition-colors duration-500"
        >
          <div className="w-full aspect-[16/10] relative overflow-hidden">
            <BrandGraphic variant={blog.graphic} />
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
