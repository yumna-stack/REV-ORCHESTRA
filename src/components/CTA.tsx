"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";
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
      <section className="relative w-full py-24 bg-[rgb(0, 0, 0)] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center bottom, rgba(232,101,10,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-[700px] mx-auto px-5 text-center relative z-10">
          <Reveal variants={scaleIn}>
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: "120%",
                letterSpacing: "-0.02em",
                color: "white",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Stop managing tools,{" "}
              <span className="text-accent-orange">Start running a system</span>
            </h2>
          </Reveal>
          <Reveal variants={fadeUp} delay={0.15}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-8 max-w-[540px] mx-auto">
              4 seats left for this quarter. Discovery calls are 30 minutes. We&apos;ll review your workflow live and show you exactly what we&apos;d build for you.
            </p>
          </Reveal>
          <Reveal variants={fadeUp} delay={0.3}>
            <motion.button onClick={() => { posthog.capture("cta_clicked", { location: "cta_section", destination: "booking_modal" }); setShowBooking(true); }} className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all" style={{ backgroundColor: "#E85600" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              Book a Call with Danny
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* ── Newsletter + Message — Cryps template exact layout ── */}
      <section className="relative w-full py-20 bg-[rgb(0, 0, 0)]">
        {/* Soft divider — fades in/out instead of a hard line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[900px] h-px pointer-events-none" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr] gap-8 items-center">
            {/* LEFT — Newsletter */}
            <Reveal variants={fadeUp}>
              <div className="flex flex-col gap-5">
                <h3
                  className="text-[clamp(28px,3.5vw,42px)] font-semibold text-white leading-[115%] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  Join Our Newsletter
                </h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.35)] leading-[170%]">
                  Join the Rev Orchestra Newsletter | GTM strategy, AI orchestration insights, and founder playbooks, delivered weekly.
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
                      className="flex-1 px-5 py-3.5 rounded-full bg-[rgb(8,8,10)] border border-[rgb(41,42,43)] text-white text-sm placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-accent-orange/50 transition-colors"
                    />
                    <motion.button
                      type="submit"
                      className="px-7 py-3.5 text-white text-sm font-semibold rounded-full hover:bg-[rgb(22,22,26)] transition-all"
                      style={{ backgroundColor: "rgb(14,14,16)", border: "1px solid rgb(60,50,42)" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Subscribe
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* CENTER — Chat icon card (Cryps: orange gradient, rounded, chat bubble icon) */}
            <Reveal variants={fadeUp} delay={0.1}>
              <div className="rounded-lg overflow-hidden w-[200px] h-[200px] relative shrink-0">
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(60,30,10,0.8) 0%, rgba(232,86,0,0.5) 50%, rgba(180,80,10,0.3) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 60%, rgba(232,86,0,0.35) 0%, transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-[40%]" style={{ background: "linear-gradient(180deg, rgba(100,50,15,0.5) 0%, transparent 100%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-[rgb(0, 0, 0)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center shadow-2xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="1.3" fill="white" />
                      <circle cx="8.5" cy="12" r="1.3" fill="white" />
                      <circle cx="15.5" cy="12" r="1.3" fill="white" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — Message card (Cryps: dark card, border, text + send message button) */}
            <Reveal variants={fadeUp} delay={0.2}>
              <div className="rounded-lg bg-[rgb(0, 0, 0)] border border-[rgb(41,42,43)] p-4 flex flex-col justify-between h-[200px]">
                <p className="text-[15px] text-[rgba(255,255,255,0.5)] leading-[165%]">
                  Our team will respond to you within the next 12 to 16 hours with the support you need.
                </p>
                <motion.a
                  href="/contact-us"
                  onClick={() => posthog.capture("cta_clicked", { location: "cta_send_message", destination: "/contact-us" })}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-[rgba(255,255,255,0.12)] text-white text-sm font-semibold uppercase tracking-wider hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgb(8,8,10)] transition-all"
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
      </section>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/70" onClick={() => { setShowBooking(false); setQualified(false); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgb(0, 0, 0)]" initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <button onClick={() => { setShowBooking(false); setQualified(false); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgb(14,14,16)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgb(36,37,40)] transition-all z-10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              <AnimatePresence mode="wait">
                {!qualified ? (
                  <motion.div key="qualify" className="p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-accent-orange/20 flex items-center justify-center"><span className="text-accent-orange text-xs font-bold">1</span></div>
                      <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Step 1 of 2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">Tell us about your business</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.4)] mb-6">So Danny can prepare for your call and make the most of your 30 minutes.</p>
                    <form onSubmit={handleQualify} className="flex flex-col gap-4">
                      <input type="text" placeholder="Your name" value={qualifyData.name} onChange={(e) => setQualifyData({ ...qualifyData, name: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <input type="email" placeholder="Work email *" required value={qualifyData.email} onChange={(e) => setQualifyData({ ...qualifyData, email: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <input type="text" placeholder="Company name *" required value={qualifyData.company} onChange={(e) => setQualifyData({ ...qualifyData, company: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]" />
                      <select value={qualifyData.arr} onChange={(e) => setQualifyData({ ...qualifyData, arr: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors">
                        <option value="" className="bg-[rgb(0, 0, 0)]">Current ARR (optional)</option>
                        <option value="pre-revenue" className="bg-[rgb(0, 0, 0)]">Pre revenue</option>
                        <option value="under-500k" className="bg-[rgb(0, 0, 0)]">&lt;$500K</option>
                        <option value="500k-2m" className="bg-[rgb(0, 0, 0)]">$500K to $2M</option>
                        <option value="2m-plus" className="bg-[rgb(0, 0, 0)]">$2M+</option>
                      </select>
                      <textarea placeholder="What's your biggest GTM challenge right now?" rows={3} value={qualifyData.challenge} onChange={(e) => setQualifyData({ ...qualifyData, challenge: e.target.value })} className="px-4 py-3 text-sm text-white bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors resize-none placeholder:text-[rgba(255,255,255,0.2)]" />
                      <motion.button type="submit" className="mt-2 px-6 py-3.5 text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[rgb(22,22,26)] transition-all" style={{ backgroundColor: "rgb(14,14,16)", border: "1px solid rgb(60,50,42)" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Continue to Calendar →
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="calendar" className="p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
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
