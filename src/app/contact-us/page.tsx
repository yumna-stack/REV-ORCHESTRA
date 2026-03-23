"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero } from "@/components/PageWrapper";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="Contact Us"
        title="Let&apos;s Build Your Pipeline Together"
        subtitle="Book a call or drop us a message. Our team responds within 12-16 hours."
      />

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left - Info */}
            <Section>
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4">Get in Touch</h3>
                  <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">
                    Whether you&apos;re ready to start or just exploring — we&apos;re happy to chat about your GTM challenges and share how we&apos;ve solved them for others.
                  </p>
                </div>

                {/* Calendly embed */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
                  <iframe
                    src="https://calendly.com/dannybossa?hide_gdpr_banner=1&background_color=0e0f11&text_color=ffffff&primary_color=E85600"
                    width="100%"
                    height="500"
                    style={{ border: "none" }}
                    title="Book a Call"
                  />
                </div>
              </div>
            </Section>

            {/* Right - Form */}
            <Section delay={200}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-12 rounded-2xl border border-accent-orange/20 bg-accent-orange/5">
                  <span className="text-4xl">✓</span>
                  <h3 className="text-xl font-medium text-white">Message Sent!</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] text-center">We&apos;ll get back to you within 12-16 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-medium text-white mb-2">Send a Message</h3>
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    { key: "company", label: "Company", type: "text", placeholder: "Company name" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.25)]"
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Message</label>
                    <textarea
                      placeholder="Tell us about your GTM challenges..."
                      rows={5}
                      required
                      className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors resize-none placeholder:text-[rgba(255,255,255,0.25)]"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all mt-2"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </Section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
