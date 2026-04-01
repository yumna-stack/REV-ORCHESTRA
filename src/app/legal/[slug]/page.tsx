"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge } from "@/components/PageWrapper";
import { usePathname } from "next/navigation";

const content: Record<string, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  "terms-conditions": {
    title: "Terms of Service",
    updated: "March 15, 2026",
    sections: [
      { heading: "1. Acceptance of Terms", body: "By accessing and using the Rev Orchestra platform and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { heading: "2. Service Description", body: "Rev Orchestra provides AI-orchestrated go-to-market (GTM) system building services for B2B companies. Our services include system design, AI agent deployment, tool integration, and training. Each engagement is scoped as a 90-day project deliverable." },
      { heading: "3. Ownership & Intellectual Property", body: "Upon completion of your project and receipt of full payment, you own all custom workflows, agent configurations, automations, and system architecture built specifically for your business. Rev Orchestra retains ownership of its proprietary methodologies, frameworks, and base templates." },
      { heading: "4. Payment Terms", body: "The $18,000 project fee is due as follows: 50% upon signing, 25% at midpoint (week 6), and 25% upon handover. All fees are non-refundable after the diagnostic phase (Week 2) is complete." },
      { heading: "5. Client Responsibilities", body: "You agree to provide timely access to your existing tools (CRM, email platform, etc.), respond to approval requests within 48 business hours, and designate a primary point of contact for the project." },
      { heading: "6. Data Handling", body: "We access your tools only to build and configure your GTM system. We do not store, export, or retain your business data, contact lists, or proprietary information after project completion. See our Privacy Policy for details." },
      { heading: "7. Limitation of Liability", body: "Rev Orchestra shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the systems we build. Our total liability is limited to the fees paid for the specific project." },
      { heading: "8. Post-Delivery Support", body: "Each project includes 30 days of post-launch support. After this period, support is available through optional retainer packages at mutually agreed rates." },
      { heading: "9. Confidentiality", body: "Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. This obligation survives termination of the agreement." },
      { heading: "10. Changes to Terms", body: "We may update these terms from time to time. Material changes will be communicated via email. Continued use of our services constitutes acceptance of updated terms." },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "March 15, 2026",
    sections: [
      { heading: "Introduction", body: "This Privacy Policy describes how Rev Orchestra (\"we\", \"us\", or \"our\") collects, uses, and discloses personal information in connection with our AI-orchestrated GTM system building services. This policy applies to: clients who engage our services, site visitors who browse our website, prospects who book discovery calls, and team members who interact with systems we build." },
      { heading: "Children", body: "Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we learn that we have collected personal information of a child under 16, we will take appropriate steps to delete such information." },
      { heading: "Information We Collect", body: "We collect information you provide directly: name, email, company name, current ARR range, and GTM challenge description when you fill out our contact form or book a call. We also collect usage data through cookies and analytics (page views, session duration, referral source) to improve our website experience." },
      { heading: "How We Use Your Information", body: "We use your information to: (1) respond to discovery call requests and qualify leads, (2) deliver our GTM system building services, (3) send you The Orchestra newsletter if you subscribe, (4) improve our website and services, and (5) comply with legal obligations." },
      { heading: "Data We Access During Projects", body: "During a client engagement, we access your existing tools (CRM, email platform, enrichment tools) solely to build and configure your GTM system. We do not export, copy, or retain your business data, contact lists, or customer information. All work is performed inside your own tool instances." },
      { heading: "Guardrails & Security", body: "We implement guardrails on all AI agent actions to prevent unintended behaviour. Role-based access control (RBAC) ensures team members only access what they need. All agent actions are logged with a full audit trail. We use encrypted connections for all tool integrations." },
      { heading: "Third-Party Services", body: "We use the following third-party services: Cal.com (scheduling), Kit/ConvertKit (newsletter), Vercel (hosting), and analytics tools. Each operates under their own privacy policies. We do not sell your personal information to third parties." },
      { heading: "Data Retention", body: "Contact form submissions are retained for 12 months. Newsletter subscriptions are retained until you unsubscribe. Project-related access to your tools is revoked upon project completion and handover." },
      { heading: "Your Rights", body: "You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, withdraw consent for newsletter communications, and lodge a complaint with a data protection authority." },
      { heading: "Changes To This Privacy Policy", body: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date." },
      { heading: "Contact Us", body: "For privacy-related inquiries, please contact us at hello@revorchestra.com or through our contact page at revorchestra.com/contact-us." },
    ],
  },
};

export default function LegalPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "terms-conditions";
  const page = content[slug] || content["terms-conditions"];

  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <section className="relative w-full pt-[140px] pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px", mask: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 60%)", WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-[800px] mx-auto px-5">
          <Section>
            <Badge text="Legal" />
            <h1 className="text-[clamp(28px,4vw,44px)] font-medium text-white mt-6 mb-4" style={{ fontFamily: "var(--font-family-heading)" }}>{page.title}</h1>
            <p className="text-xs text-accent-orange uppercase tracking-wider font-medium mb-12">Latest updated on {page.updated}</p>
          </Section>
          {page.sections.map((section, i) => (
            <Section key={i} delay={i * 60}>
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-3">{section.heading}</h2>
                <p className="text-base text-[rgba(255,255,255,0.5)] leading-[180%]">{section.body}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
