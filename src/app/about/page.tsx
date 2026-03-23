"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";

const team = [
  { name: "Danny Bossa", role: "Founder & GTM Architect", bio: "15+ years building revenue systems for B2B companies." },
  { name: "Sarah Chen", role: "Head of Operations", bio: "Ex-HubSpot, specializing in CRM architecture and workflow design." },
  { name: "Marcus Rivera", role: "AI Engineer", bio: "Building intelligent automation workflows that actually work." },
  { name: "Aisha Patel", role: "Outbound Strategist", bio: "Designed outbound engines generating $50M+ pipeline." },
  { name: "Tom Erikson", role: "Integration Lead", bio: "Connects any tool to any tool. 200+ integrations deployed." },
  { name: "Nina Kowalski", role: "Client Success", bio: "Ensures every client launches on time and scales from day one." },
];

const values = [
  { title: "Build, Don't Consult", desc: "We deliver working infrastructure, not slide decks." },
  { title: "Signals Over Activity", desc: "We measure pipeline movement, not email volume." },
  { title: "Ownership, Not Dependency", desc: "Every system we build is handed over. Yours forever." },
  { title: "Speed With Precision", desc: "90-day builds that last years." },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="About Us"
        title="We Build Revenue Infrastructure That Lasts"
        subtitle="REVORCHESTRA was founded to solve the broken GTM stack problem. We don't consult — we build and hand over."
      />

      {/* Values */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <Section className="text-center mb-16">
            <Badge text="Our Values" />
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-6">
              What We Believe
            </h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Section key={i} delay={i * 100}>
                <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] h-full">
                  <div className="w-3 h-3 rounded-full bg-accent-orange mb-5" />
                  <h3 className="text-base font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{v.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Section className="text-center mb-16">
            <Badge text="Meet the Team" />
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-6">
              The People Behind the Pipeline
            </h2>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Section key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(232,86,0,0.2)] transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-orange/20 to-accent-purple/10 flex items-center justify-center mb-6">
                    <span className="text-2xl font-semibold text-accent-orange">{member.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-accent-orange mb-3">{member.role}</p>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{member.bio}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <Section className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
            Want to Work With Us?
          </h2>
          <CTAButton text="BOOK A CALL" />
        </Section>
      </section>

      <Footer />
    </main>
  );
}
