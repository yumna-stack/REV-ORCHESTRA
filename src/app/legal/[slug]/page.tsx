"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge } from "@/components/PageWrapper";
import { usePathname } from "next/navigation";

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  "terms-conditions": {
    title: "Terms & Conditions",
    sections: [
      { heading: "1. Acceptance of Terms", body: "By accessing and using the CRYPS platform, you agree to be bound by these Terms and Conditions." },
      { heading: "2. Use of Service", body: "You may use our services for lawful purposes only. You agree not to use the platform for any unauthorized activities." },
      { heading: "3. Account Responsibility", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account." },
      { heading: "4. Intellectual Property", body: "All content, features, and functionality are owned by CRYPS and are protected by international copyright laws." },
      { heading: "5. Limitation of Liability", body: "CRYPS shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the platform." },
      { heading: "6. Changes to Terms", body: "We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms." },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      { heading: "1. Information We Collect", body: "We collect information you provide directly, such as account details, and information automatically through cookies and analytics." },
      { heading: "2. How We Use Your Information", body: "We use collected information to provide, maintain, and improve our services, and to communicate with you." },
      { heading: "3. Data Security", body: "We implement industry-standard security measures to protect your personal information from unauthorized access." },
      { heading: "4. Third-Party Services", body: "We may share data with trusted third-party service providers who assist in operating our platform." },
      { heading: "5. Your Rights", body: "You have the right to access, correct, or delete your personal data. Contact us to exercise these rights." },
      { heading: "6. Contact Us", body: "For privacy-related inquiries, please contact our data protection team through the contact page." },
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
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative z-10 max-w-[800px] mx-auto px-5">
          <Section>
            <Badge text="Legal" />
            <h1 className="text-[clamp(28px,4vw,44px)] font-medium text-white mt-6 mb-12">{page.title}</h1>
          </Section>
          {page.sections.map((section, i) => (
            <Section key={i} delay={i * 80}>
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
