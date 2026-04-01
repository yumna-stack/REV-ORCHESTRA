"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp, scaleIn } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

export default function CTA() {
  const [showBooking, setShowBooking] = useState(false);
  const [qualifyData, setQualifyData] = useState({ name: "", email: "", company: "", arr: "", challenge: "" });
  const [qualified, setQualified] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleQualify = (e: React.FormEvent) => {
    e.preventDefault();
    if (qualifyData.email && qualifyData.company) setQualified(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setSubscribed(true);
  };

  return (
    <>
      {/* ── Main CTA Section ── */}
      <section className="relative w-full py-24 bg-[rgb(8,8,15)] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center bottom, rgba(232,101,10,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-[700px] mx-auto px-5 text-center relative z-10">
          <Reveal variants={scaleIn}>
            <h2 className="text-[clamp(28px,4.5vw,52px)] font-normal leading-[120%] tracking-[-1px] text-white mb-6" style={{ fontFamily: "var(--font-family-heading)" }}>
              The founders who built their system in Q1{" "}
              <span className="text-accent-orange italic">are already booking calls from it.</span>
            </h2>
          </Reveal>
          <Reveal variants={fadeUp} delay={0.15}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-8 max-w-[540px] mx-auto">
              4 seats left for Q2. Discovery calls are 30 minutes. We&apos;ll review your current GTM live on the call and tell you honestly what we&apos;d build.
            </p>
          </Reveal>
          <Reveal variants={fadeUp} delay={0.3}>
            <motion.button onClick={() => setShowBooking(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              Book a Call with Danny
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* ── Newsletter + Message — Framer Cryps template exact ── */}
      <section className="relative w-full bg-[rgb(14,15,17)]">
        {/* Teal zigzag / chevron border — Cryps style */}
        <div className="w-full h-[12px] overflow-hidden">
          <svg width="100%" height="12" preserveAspectRatio="none" viewBox="0 0 1200 12">
            <path d="M0 12 L15 0 L30 12 L45 0 L60 12 L75 0 L90 12 L105 0 L120 12 L135 0 L150 12 L165 0 L180 12 L195 0 L210 12 L225 0 L240 12 L255 0 L270 12 L285 0 L300 12 L315 0 L330 12 L345 0 L360 12 L375 0 L390 12 L405 0 L420 12 L435 0 L450 12 L465 0 L480 12 L495 0 L510 12 L525 0 L540 12 L555 0 L570 12 L585 0 L600 12 L615 0 L630 12 L645 0 L660 12 L675 0 L690 12 L705 0 L720 12 L735 0 L750 12 L765 0 L780 12 L795 0 L810 12 L825 0 L840 12 L855 0 L870 12 L885 0 L900 12 L915 0 L930 12 L945 0 L960 12 L975 0 L990 12 L1005 0 L1020 12 L1035 0 L1050 12 L1065 0 L1080 12 L1095 0 L1110 12 L1125 0 L1140 12 L1155 0 L1170 12 L1185 0 L1200 12" fill="none" stroke="#0EA5E9" strokeWidth="2" />
          </svg>
        </div>

        <div className="w-full py-16 bg-[rgb(18,19,22)]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-6 items-start">
              {/* LEFT — Newsletter */}
              <Reveal variants={fadeUp}>
                <div className="flex flex-col gap-5 max-w-[500px]">
                  <h3
                    className="text-[clamp(28px,3.5vw,42px)] font-medium text-white leading-[115%] tracking-[-1px] italic"
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    Join Our Newsletter
                  </h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.35)] leading-[170%]">
                    Join the Rev Orchestra Newsletter | GTM strategy, AI orchestration insights, and founder playbooks — delivered weekly.
                  </p>
                  {subscribed ? (
                    <motion.div
                      className="flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="rgba(34,197,94,0.2)" /><path d="M6 10l3 3 5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="text-sm text-green-400 font-medium">You&apos;re in! Check your inbox.</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex gap-3">
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        className="flex-1 px-5 py-3.5 rounded-xl bg-[rgb(25,27,31)] border border-[rgb(41,42,43)] text-white text-sm placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-accent-orange/50 transition-colors"
                      />
                      <motion.button
                        type="submit"
                        className="px-7 py-3.5 bg-accent-orange text-white text-sm font-semibold rounded-xl hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Subscribe
                      </motion.button>
                    </form>
                  )}
                </div>
              </Reveal>

              {/* CENTER — Chat icon card (Framer Cryps exact: orange gradient bg) */}
              <Reveal variants={fadeUp} delay={0.1}>
                <div className="rounded-[24px] overflow-hidden w-[200px] h-[210px] relative">
                  {/* Orange-to-dark gradient background — exact Framer style */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(140,70,20,0.5) 0%, rgba(232,86,0,0.6) 50%, rgba(180,80,10,0.35) 100%)" }} />
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, rgba(232,86,0,0.3) 0%, transparent 70%)" }} />
                  <div className="absolute top-0 left-0 right-0 h-[40%]" style={{ background: "linear-gradient(180deg, rgba(232,120,40,0.35) 0%, transparent 100%)" }} />
                  {/* Chat icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center shadow-xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="1.2" fill="white" />
                        <circle cx="8.5" cy="12" r="1.2" fill="white" />
                        <circle cx="15.5" cy="12" r="1.2" fill="white" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Reveal>

              {/* RIGHT — Message card (Framer Cryps: dark bg, rounded border, text + button) */}
              <Reveal variants={fadeUp} delay={0.2}>
                <div className="rounded-[24px] bg-[rgb(22,23,26)] border border-[rgb(38,39,42)] p-7 flex flex-col justify-between h-[210px] w-[320px]">
                  <p className="text-[14px] text-[rgba(255,255,255,0.45)] leading-[165%]">
                    Our team will respond to you within the next 12-16 hours with the support you need.
                  </p>
                  <motion.a
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold uppercase tracking-wider hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)] transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    SEND MESSAGE
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Bottom teal zigzag border */}
        <div className="w-full h-[12px] overflow-hidden">
          <svg width="100%" height="12" preserveAspectRatio="none" viewBox="0 0 1200 12">
            <path d="M0 0 L15 12 L30 0 L45 12 L60 0 L75 12 L90 0 L105 12 L120 0 L135 12 L150 0 L165 12 L180 0 L195 12 L210 0 L225 12 L240 0 L255 12 L270 0 L285 12 L300 0 L315 12 L330 0 L345 12 L360 0 L375 12 L390 0 L405 12 L420 0 L435 12 L450 0 L465 12 L480 0 L495 12 L510 0 L525 12 L540 0 L555 12 L570 0 L585 12 L600 0 L615 12 L630 0 L645 12 L660 0 L675 12 L690 0 L705 12 L720 0 L735 12 L750 0 L765 12 L780 0 L795 12 L810 0 L825 12 L840 0 L855 12 L870 0 L885 12 L900 0 L915 12 L930 0 L945 12 L960 0 L975 12 L990 0 L1005 12 L1020 0 L1035 12 L1050 0 L1065 12 L1080 0 L1095 12 L1110 0 L1125 12 L1140 0 L1155 12 L1170 0 L1185 12 L1200 0" fill="none" stroke="#0EA5E9" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowBooking(false); setQualified(false); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgb(14,15,17)]" initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <button onClick={() => { setShowBooking(false); setQualified(false); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all z-10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              <AnimatePresence mode="wait">
                {!qualified ? (
                  <motion.div key="qualify" className="p-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-accent-orange/20 flex items-center justify-center"><span className="text-accent-orange text-xs font-bold">1</span></div>
                      <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Step 1 of 2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">Tell us about your business</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.4)] mb-6">So Danny can prepare for your call and make the most of your 30 minutes.</p>
                    <form onSubmit={handleQualify} className="flex flex-col gap-4">
                      <input type="text" placeholder="Your name" value={qualifyData.name} onChange={(e) => setQualifyData({ ...qualifyData, name: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <input type="email" placeholder="Work email *" required value={qualifyData.email} onChange={(e) => setQualifyData({ ...qualifyData, email: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <input type="text" placeholder="Company name *" required value={qualifyData.company} onChange={(e) => setQualifyData({ ...qualifyData, company: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <select value={qualifyData.arr} onChange={(e) => setQualifyData({ ...qualifyData, arr: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors">
                        <option value="" className="bg-[rgb(14,15,17)]">Current ARR (optional)</option>
                        <option value="pre-revenue" className="bg-[rgb(14,15,17)]">Pre-revenue</option>
                        <option value="under-500k" className="bg-[rgb(14,15,17)]">&lt;$500K</option>
                        <option value="500k-2m" className="bg-[rgb(14,15,17)]">$500K - $2M</option>
                        <option value="2m-plus" className="bg-[rgb(14,15,17)]">$2M+</option>
                      </select>
                      <textarea placeholder="What's your biggest GTM challenge right now?" rows={3} value={qualifyData.challenge} onChange={(e) => setQualifyData({ ...qualifyData, challenge: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors resize-none placeholder:text-[rgba(255,255,255,0.2)]" />
                      <motion.button type="submit" className="mt-2 px-6 py-3.5 bg-accent-orange text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Continue to Calendar →
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="calendar" className="p-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                      <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Step 2 of 2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">Pick a time with Danny</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.4)] mb-6">30-minute discovery call. We&apos;ll review your stack live.</p>
                    <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-white" style={{ minHeight: 500 }}>
                      <iframe src={`${CAL_URL}?embed=true&layout=month_view&theme=light`} className="w-full border-0" style={{ height: 500 }} title="Book a call with Danny" />
                    </div>
                    <button onClick={() => setQualified(false)} className="mt-4 text-xs text-[rgba(255,255,255,0.3)] hover:text-white transition-colors">← Back to form</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
