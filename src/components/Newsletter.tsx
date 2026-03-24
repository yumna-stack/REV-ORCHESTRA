"use client";

import { useState, useCallback } from "react";
import { Reveal, fadeUp, fadeLeft, fadeRight } from "@/components/motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  }, [email]);

  return (
    <section
      id="newsletter"
      className="w-full py-20 bg-black-light"
    >
      {/* Dashed top border */}
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="border-t border-dashed border-accent-orange/30 mb-16" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left - Newsletter form */}
        <Reveal variants={fadeLeft}>
          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(24px,3vw,36px)] font-semibold leading-[120%] tracking-[-1px] text-white">
              Join Our Newsletter
            </h2>
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] max-w-[400px]">
              Join the CRYPS Newsletter. Crypto enthusiasts unite! Stay ahead with the latest insights and market updates.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 py-4">
                <span className="text-accent-orange text-xl">&#10003;</span>
                <span className="text-white font-medium">You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="flex-1 max-w-[280px] px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.25)]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-accent-orange text-white text-sm font-medium rounded-full hover:brightness-110 transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Right - Chat icon + Support message */}
        <Reveal variants={fadeRight}>
          <div className="flex items-start gap-6">
            {/* Chat icon */}
            <div
              className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(232,86,0,0.2) 0%, rgba(100,40,10,0.1) 100%)",
                border: "1px solid rgba(232,86,0,0.15)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-base text-[rgba(255,255,255,0.6)] leading-[170%]">
                Our team will respond to you within the next 12-16 hours with the support you need.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-[rgba(255,255,255,0.15)] rounded-full hover:border-[rgba(255,255,255,0.3)] transition-all w-fit"
              >
                SEND MESSAGE
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
