import Navigation from "@/components/Navigation";

import Hero from "@/components/Hero";
import StackLogos from "@/components/StackLogos";
import AnimatedText from "@/components/AnimatedText";
import Stats from "@/components/Stats";
import SixAgents from "@/components/SixAgents";
import LiveSystem from "@/components/LiveSystem";
import ProcessVisual from "@/components/ProcessVisual";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/* Gradient divider — blends sections with different bg colors seamlessly */
function SectionBlend({ from = "rgb(14,15,17)", to = "rgb(8,8,15)" }: { from?: string; to?: string }) {
  return (
    <div
      className="relative w-full h-24 pointer-events-none -mt-12 -mb-12 z-[1]"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-[rgb(14,15,17)]">
      <Navigation />

      <Hero />
      <AnimatedText />
      <StackLogos />
      <Stats />
      <SixAgents />
      <LiveSystem />
      <ProcessVisual />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <SectionBlend from="rgb(14,15,17)" to="rgb(8,8,15)" />
      <CTA />
      <SectionBlend from="rgb(14,15,17)" to="rgb(14,15,17)" />
      <Footer />
    </main>
  );
}
