"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, fadeLeft, fadeRight, scaleUp } from "@/components/motion";
import { useState } from "react";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    arr: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="Contact"
        title="Let's talk about your GTM."
        subtitle="30-minute discovery call. We'll review your current stack live and show you exactly where the gaps are."
      />

      {/* Contact Card */}
      <section className="py-20">
        <div className="max-w-[1100px] mx-auto px-5">
          <Reveal variants={scaleUp}>
            <div
              className="rounded-[44px] p-[8px]"
              style={{ border: "0.93px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="relative rounded-[36px] overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgb(14,15,17)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* LEFT: Contact Info */}
                  <Reveal variants={fadeLeft} className="p-10 md:p-14 flex flex-col gap-10">
                    <StaggerContainer className="flex flex-col gap-4">
                      <StaggerItem>
                        <h2 className="text-2xl md:text-3xl font-medium text-white leading-[120%]">
                          Book a Call with Danny
                        </h2>
                      </StaggerItem>
                      <StaggerItem>
                        <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[170%]">
                          30-minute discovery call. No pitch deck, no hard sell, just an honest review of your GTM stack and where orchestration could help.
                        </p>
                      </StaggerItem>
                    </StaggerContainer>

                    <StaggerContainer className="flex flex-col gap-8">
                      {/* Calendly link */}
                      <StaggerItem>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Schedule</span>
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-accent-orange text-sm hover:underline">
                              Book via Calendly →
                            </a>
                          </div>
                        </div>
                      </StaggerItem>

                      {/* Email */}
                      <StaggerItem>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Email</span>
                            <span className="text-white text-sm">hello@revorchestra.com</span>
                          </div>
                        </div>
                      </StaggerItem>

                      {/* Location */}
                      <StaggerItem>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Based in</span>
                            <span className="text-white text-sm">Sri Lanka & Singapore</span>
                          </div>
                        </div>
                      </StaggerItem>
                    </StaggerContainer>
                  </Reveal>

                  {/* RIGHT: Form */}
                  <Reveal variants={fadeRight} className="p-10 md:p-14 border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.06)]">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                        <div className="w-16 h-16 rounded-full bg-[rgba(232,86,0,0.15)] flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-white">Request Received!</h3>
                        <p className="text-sm text-[rgba(255,255,255,0.45)] text-center max-w-[300px]">
                          Danny will get back to you within 24 hours to schedule your discovery call.
                        </p>
                      </div>
                    ) : (
                      <StaggerContainer className="flex flex-col gap-6">
                        <StaggerItem>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Name</label>
                            <input type="text" placeholder="Your name" className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Email <span className="text-[#E85600]">*</span></label>
                            <input type="email" placeholder="your@email.com" required className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Company</label>
                            <input type="text" placeholder="Your company" className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Current ARR</label>
                            <select className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors" onChange={(e) => setFormData({ ...formData, arr: e.target.value })}>
                              <option value="" className="bg-[rgb(14,15,17)]">Select range</option>
                              <option value="pre-revenue" className="bg-[rgb(14,15,17)]">Pre-revenue</option>
                              <option value="under-500k" className="bg-[rgb(14,15,17)]">&lt;$500K</option>
                              <option value="500k-2m" className="bg-[rgb(14,15,17)]">$500K - $2M</option>
                              <option value="2m-plus" className="bg-[rgb(14,15,17)]">$2M+</option>
                            </select>
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">GTM Challenge</label>
                            <textarea placeholder="Brief description of your current GTM challenge..." rows={3} className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors resize-none placeholder:text-[rgba(255,255,255,0.2)]" onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <button type="submit" onClick={handleSubmit} className="mt-2 px-8 py-4 bg-[#E85600] text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-full">
                            Request a Call
                          </button>
                        </StaggerItem>
                      </StaggerContainer>
                    )}
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
