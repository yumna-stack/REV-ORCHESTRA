"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, CTAButton } from "@/components/PageWrapper";

export default function BlogDetailPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <section className="relative w-full pt-[140px] pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="relative z-10 max-w-[800px] mx-auto px-5">
          <Section>
            <Badge text="Case Study" />
            <h1 className="text-[clamp(28px,4vw,44px)] font-medium leading-[120%] tracking-[-1.5px] text-white mt-6 mb-6">
              How We Built a Revenue Engine in 90 Days
            </h1>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange text-sm font-bold">R</div>
              <div>
                <p className="text-sm text-white font-medium">REVORCHESTRA Team</p>
                <p className="text-xs text-[rgba(255,255,255,0.4)]">March 2026 · 5 min read</p>
              </div>
            </div>
          </Section>

          <Section delay={200}>
            <div className="w-full aspect-[16/9] rounded-2xl mb-12" style={{ background: "linear-gradient(135deg, rgba(232,86,0,0.15), rgba(100,40,10,0.05))" }} />
          </Section>

          <Section delay={300}>
            <article className="prose prose-invert max-w-none">
              <div className="flex flex-col gap-6 text-base text-[rgba(255,255,255,0.6)] leading-[180%]">
                <p>When a B2B SaaS founder came to us, their pipeline was scattered across 8 different tools. Their SDRs were manually copying data between Instantly, HubSpot, and Google Sheets. Signals were being missed. Pipeline felt random.</p>
                <h2 className="text-2xl font-medium text-white mt-4">The Challenge</h2>
                <p>The team had invested in best-in-class tools individually — but none of them talked to each other. A prospect could visit the pricing page, open 3 emails, and attend a webinar, yet still receive a generic cold outbound sequence.</p>
                <h2 className="text-2xl font-medium text-white mt-4">Our Approach</h2>
                <p>We audited their entire stack in Week 1, identified 23 broken workflows, and mapped out the ideal signal-to-action flow. By Week 4, we had rebuilt their CRM architecture and connected every tool through n8n automations.</p>
                <h2 className="text-2xl font-medium text-white mt-4">The Results</h2>
                <p>Within 90 days, their pipeline increased by 47%, response time dropped by 3x, and their team saved 15+ hours per week on manual data entry. The system was fully handed over — they own it completely.</p>
              </div>
            </article>
          </Section>

          <Section delay={400} className="mt-16 text-center flex flex-col items-center gap-4">
            <h3 className="text-2xl font-medium text-white">Want Similar Results?</h3>
            <CTAButton text="BOOK A CALL" />
          </Section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
