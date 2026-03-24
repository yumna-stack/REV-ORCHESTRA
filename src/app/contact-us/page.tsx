"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero } from "@/components/PageWrapper";
import { useState, useEffect, useRef } from "react";

/* ── Crypto partner logos (simple colored circles with symbol text) ── */
const partners = [
  { symbol: "ADA", name: "Cardano", color: "#0033AD" },
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "SOL", name: "Solana", color: "#9945FF" },
  { symbol: "BNB", name: "BNB Chain", color: "#F3BA2F" },
];

/* ── Logo ticker logos ── */
const tickerLogos = [
  "Coinbase", "Binance", "Kraken", "Gemini", "Uniswap",
  "Aave", "Chainlink", "Polygon", "Avalanche", "Fantom",
  "Arbitrum", "Optimism",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* ── Hero ── */}
      <PageHero
        badge="Contact Us"
        title="Get in Touch with CRYPS"
        subtitle="We&apos;re here to help you navigate the world of crypto data services. Reach out to our team for support, partnerships, or general inquiries."
      />

      {/* ── Contact Card ── */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Outer border */}
          <div
            className="rounded-[44px] p-[8px]"
            style={{ border: "0.93px solid rgba(255,255,255,0.08)" }}
          >
            {/* Inner border */}
            <div
              className="relative rounded-[36px] overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgb(14,15,17)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* ── LEFT: Contact Information ── */}
                <div className="p-10 md:p-14 flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-white leading-[120%]">
                      Cryps Contact Information
                    </h2>
                    <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[170%]">
                      Have questions about our crypto data services? Our team is ready to assist you with any inquiries.
                    </p>
                  </div>

                  <div className="flex flex-col gap-8">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Phone</span>
                        <span className="text-white text-sm">+1-888-CRYPTO9</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Email</span>
                        <span className="text-white text-sm">support@cryps.io</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(232,86,0,0.1)] border border-[rgba(232,86,0,0.2)] flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">Location</span>
                        <span className="text-white text-sm leading-[160%]">
                          CRYPS Hub, 456 Data Drive,<br />
                          Crypto District, CA 90210
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Contact Form ── */}
                <div className="p-10 md:p-14 border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.06)]">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                      <div className="w-16 h-16 rounded-full bg-[rgba(232,86,0,0.15)] flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-white">Message Sent!</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] text-center max-w-[300px]">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">
                          Email <span className="text-[#E85600]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      {/* Location */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">
                          Location <span className="text-[#E85600]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="City, Country"
                          required
                          className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      {/* Reason */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider">
                          Reason
                        </label>
                        <textarea
                          placeholder="How can we help you?"
                          rows={4}
                          className="px-5 py-3.5 text-sm text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-[#E85600]/50 transition-colors resize-none placeholder:text-[rgba(255,255,255,0.2)]"
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-2 px-8 py-4 bg-[#E85600] text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-full"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners Section ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-14">
            <Badge text="Partners" />
            <h2 className="mt-6 text-[clamp(28px,4vw,40px)] font-medium text-white leading-[110%] tracking-[-1px]">
              Our Crypto Partners
            </h2>
            <p className="mt-4 text-base text-[rgba(255,255,255,0.45)] max-w-[500px] mx-auto leading-[160%]">
              Trusted by leading blockchain networks and cryptocurrency platforms worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {partners.map((partner) => (
              <div
                key={partner.symbol}
                className="rounded-[44px] p-[8px]"
                style={{ border: "0.93px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="rounded-[36px] p-8 flex flex-col items-center gap-5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgb(14,15,17)",
                  }}
                >
                  {/* Coin circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: partner.color }}
                  >
                    {partner.symbol.charAt(0)}
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-white text-base font-medium">{partner.symbol}</span>
                    <span className="text-[10px] text-[#E85600] uppercase tracking-[0.15em] font-medium">
                      Authorized Partner
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Logo Ticker ── */}
      <LogoTicker />

      <Footer />
    </main>
  );
}

/* ── Logo Ticker Component ── */
function LogoTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const items = [...tickerLogos, ...tickerLogos, ...tickerLogos];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-16 bg-[rgb(14,15,17)] overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />

      <div
        className="transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "300ms" }}
      >
        <div
          className="flex items-center gap-[70px] w-max"
          style={{ animation: "logoScroll 35s linear infinite" }}
        >
          {items.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#E85600] opacity-60" />
              <span className="text-sm text-[rgba(255,255,255,0.4)] whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
