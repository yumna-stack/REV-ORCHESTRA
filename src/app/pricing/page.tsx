"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import { Section, PageHero, CTAButton } from "@/components/PageWrapper";

export default function PricingPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="Choose the package that fits your stage. No hidden fees, no long-term lock-ins."
      />
      <Pricing />
      <FAQ />
      <section className="py-28">
        <Section className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
            Not Sure Which Plan Fits?
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[500px]">
            Book a free call and we&apos;ll recommend the right package for your stage.
          </p>
          <CTAButton text="BOOK A CALL" />
        </Section>
      </section>
      <Footer />
    </main>
  );
}
