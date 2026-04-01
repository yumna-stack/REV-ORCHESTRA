"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero, StaggerGrid, GridItem } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";

const resources = [
  {
    title: "The Orchestra",
    desc: "Weekly newsletter. Free. Actually useful. GTM strategy, AI orchestration insights, and founder playbooks — delivered every Tuesday.",
    href: "/resources/orchestra",
    cta: "Subscribe",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    title: "Blog",
    desc: "Deep dives into AI-orchestrated GTM, signal-led outbound, agent architecture, and founder strategy. No fluff, no SEO filler.",
    href: "/blogs",
    cta: "Read Articles",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: "Playbooks",
    desc: "Downloadable GTM frameworks. Signal mapping templates. ICP audit checklists. The same tools we use with our clients — free.",
    href: "/resources",
    cta: "Coming Soon",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function ResourcesPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="Resources"
        title="Free GTM thinking."
        subtitle="Download it. Read it. Build it. No gating, no email walls — just useful stuff."
      />

      <section className="w-full py-16 bg-[rgb(14,15,17)]">
        <div className="max-w-[1000px] mx-auto px-5">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((r, i) => (
              <GridItem key={i}>
                <motion.div
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8 h-full flex flex-col"
                  whileHover={{ borderColor: "rgba(232,86,0,0.2)", y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-5">
                    {r.icon}
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-family-heading)" }}>
                    {r.title}
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] mb-6 flex-1">{r.desc}</p>
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-2 text-sm text-accent-orange font-medium hover:brightness-125 transition-all"
                  >
                    {r.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <Footer />
    </main>
  );
}
