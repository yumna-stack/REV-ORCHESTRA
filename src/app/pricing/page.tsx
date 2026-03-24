"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero, StaggerGrid, GridItem } from "@/components/PageWrapper";
import { Reveal, StaggerContainer, StaggerItem, fadeUp } from "@/components/motion";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface Feature {
  label: string;
  active: boolean;
}

interface Plan {
  name: string;
  icon: React.ReactNode;
  price: number;
  features: Feature[];
  highlight?: "orange" | "purple";
}

const starterFeatures: Feature[] = [
  { label: "API Suite", active: true },
  { label: "1M Requests / Month", active: true },
  { label: "24/7 Support", active: false },
  { label: "Crypto Buying & Selling", active: false },
  { label: "P2P Payments", active: true },
  { label: "Full Dashboard Access", active: false },
];

const proFeatures: Feature[] = [
  { label: "API Suite", active: true },
  { label: "1M Requests / Month", active: true },
  { label: "24/7 Support", active: true },
  { label: "Crypto Buying & Selling", active: false },
  { label: "P2P Payments", active: true },
  { label: "Full Dashboard Access", active: false },
];

const enterpriseFeatures: Feature[] = [
  { label: "API Suite", active: true },
  { label: "1M Requests / Month", active: true },
  { label: "24/7 Support", active: true },
  { label: "Crypto Buying & Selling", active: true },
  { label: "P2P Payments", active: true },
  { label: "Full Dashboard Access", active: true },
];

/* Plan icons */
const StarterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="1.5" />
    <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ProIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EnterpriseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="#9897FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const plans: Plan[] = [
  { name: "Starter", icon: <StarterIcon />, price: 25, features: starterFeatures },
  { name: "Pro", icon: <ProIcon />, price: 30, features: proFeatures, highlight: "orange" },
  { name: "Enterprise", icon: <EnterpriseIcon />, price: 50, features: enterpriseFeatures, highlight: "purple" },
];

/* ------------------------------------------------------------------ */
/*  Check icons                                                        */
/* ------------------------------------------------------------------ */

function GreenCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="rgba(183,233,50,0.12)" />
      <path d="M6.5 10.5l2 2 5-5" stroke="#B7E932" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrayCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.04)" />
      <path d="M6.5 10.5l2 2 5-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PricingCard                                                        */
/* ------------------------------------------------------------------ */

function PricingCard({ plan }: { plan: Plan }) {
  const isOrange = plan.highlight === "orange";
  const isPurple = plan.highlight === "purple";

  /* outer wrapper border */
  const outerBorder = "0.93px solid rgba(255,255,255,0.03)";

  /* inner border per plan */
  let innerBorder = "1px solid rgba(255,255,255,0.06)";
  if (isOrange) innerBorder = "1px solid rgba(232,86,0,0.35)";
  if (isPurple) innerBorder = "1px solid rgba(152,150,255,0.24)";

  return (
    <motion.div
      className="relative flex-1 min-w-[300px] max-w-[400px]"
      style={{ padding: 8, borderRadius: 44, border: outerBorder, background: "rgba(255,255,255,0.01)" }}
      whileHover={{ y: -6, borderColor: "rgba(232,86,0,0.25)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Orange corner glow for Pro */}
      {isOrange && (
        <>
          <div
            className="absolute top-0 left-0 w-[140px] h-[140px] pointer-events-none"
            style={{
              borderRadius: "44px 0 0 0",
              background: "radial-gradient(ellipse at 0% 0%, rgba(232,86,0,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[140px] h-[140px] pointer-events-none"
            style={{
              borderRadius: "0 0 44px 0",
              background: "radial-gradient(ellipse at 100% 100%, rgba(232,86,0,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div
        className="relative z-10 flex flex-col p-8"
        style={{ borderRadius: 36, border: innerBorder, background: "rgb(14,15,17)" }}
      >
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-6">
          {plan.icon}
          <span className="text-white text-base font-medium tracking-wide">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1 mb-3">
          <span className="text-white text-[44px] font-semibold leading-none tracking-[-2px]">${plan.price}</span>
          <span className="text-[rgba(255,255,255,0.35)] text-sm mb-1">/mo</span>
        </div>

        {/* Tagline */}
        <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed mb-8">
          Powerful &amp; Simple Solution
        </p>

        {/* CTA Button */}
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-white text-xs font-semibold uppercase tracking-[0.15em] transition-all hover:brightness-110"
          style={{
            background: isOrange
              ? "linear-gradient(135deg, #E85600 0%, #c44900 100%)"
              : "rgba(255,255,255,0.06)",
            border: isOrange ? "none" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          GET STARTED
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(255,255,255,0.06)] my-8" />

        {/* Features */}
        <ul className="flex flex-col gap-4">
          {plan.features.map((f) => (
            <li key={f.label} className="flex items-center gap-3">
              {f.active ? <GreenCheck /> : <GrayCheck />}
              <span
                className="text-sm"
                style={{ color: f.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)" }}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Price Comparison Table                                             */
/* ------------------------------------------------------------------ */

const comparisonFeatures = [
  "API Suite",
  "1M Requests / Month",
  "24/7 Support",
  "Crypto Buying & Selling",
  "P2P Payments",
  "Full Dashboard Access",
];

const comparisonData: Record<string, boolean[]> = {
  Starter: [true, true, false, false, true, false],
  Pro: [true, true, true, false, true, false],
  Enterprise: [true, true, true, true, true, true],
};

function ComparisonTable() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1100px] mx-auto px-5">
        <Reveal variants={fadeUp}>
          <div className="text-center mb-14">
            <Badge text="Compare" />
            <h2 className="mt-6 text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
              Price Comparison
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="py-4 pr-6 text-sm text-[rgba(255,255,255,0.4)] font-normal">Features</th>
                  {["Starter", "Pro", "Enterprise"].map((p) => (
                    <th key={p} className="py-4 px-6 text-sm text-white font-medium text-center">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat, i) => (
                  <motion.tr
                    key={feat}
                    className="border-b border-[rgba(255,255,255,0.04)]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <td className="py-4 pr-6 text-sm text-[rgba(255,255,255,0.6)]">{feat}</td>
                    {["Starter", "Pro", "Enterprise"].map((p) => (
                      <td key={p} className="py-4 px-6 text-center">
                        {comparisonData[p][i] ? (
                          <span className="inline-flex justify-center"><GreenCheck /></span>
                        ) : (
                          <span className="inline-flex justify-center"><GrayCheck /></span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)] font-[Inter,sans-serif]">
      <Navigation />

      <PageHero
        badge="About"
        title="Simple Pricing"
        subtitle="Gain real-time insights into your crypto portfolio and make informed investment decisions."
      />

      {/* Pricing Cards */}
      <section className="w-full pb-24">
        <StaggerGrid className="max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-stretch justify-center gap-6">
          {plans.map((plan) => (
            <GridItem key={plan.name}>
              <PricingCard plan={plan} />
            </GridItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Price Comparison */}
      <ComparisonTable />

      <Footer />
    </main>
  );
}
