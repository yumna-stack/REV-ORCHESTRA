"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";

const features = [
  { title: "Pipeline Dashboard", desc: "Unified view of every signal, touchpoint, and deal across your entire GTM stack.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { title: "Signal Routing", desc: "AI-powered routing that sends the right message to the right person at the right time.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "CRM Automation", desc: "Keep your CRM clean, updated, and actionable — automatically, without manual entry.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { title: "Outbound Engine", desc: "Automated multi-channel outbound sequences powered by buyer intent signals.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "AI Workflows", desc: "Deploy AI agents for research, enrichment, content generation, and smart handoffs.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { title: "Analytics & Reports", desc: "Track pipeline velocity, conversion rates, and ROI across every touchpoint.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
];

const integrations = [
  "HubSpot", "Salesforce", "Instantly", "Clay", "Apollo", "LinkedIn", "Slack", "n8n",
  "Calendly", "Smartlead", "HeyReach", "Notion", "Google Sheets", "Zapier", "Stripe", "Intercom",
];

export default function ProductsPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="Products"
        title="Everything You Need to Orchestrate Revenue"
        subtitle="A complete suite of tools to audit, build, automate, and scale your GTM motion."
      />

      {/* Features Grid */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Section key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(232,86,0,0.2)] transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{f.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* How It Connects */}
      <section className="py-28 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Section>
            <div className="text-center mb-16">
              <Badge text="Integrations" />
              <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-6 mb-4">
                Connects With Your Entire Stack
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[550px] mx-auto">
                We plug into the tools you already use — no migration, no disruption.
              </p>
            </div>
          </Section>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((name, i) => (
              <Section key={i} delay={i * 50}>
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-accent-orange/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange text-sm font-bold">
                    {name.charAt(0)}
                  </div>
                  <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{name}</span>
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
            Ready to Build Your GTM Engine?
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[500px]">
            Book a free strategy call and see how we can transform your pipeline in 90 days.
          </p>
          <CTAButton text="BOOK A CALL" />
        </Section>
      </section>

      <Footer />
    </main>
  );
}
