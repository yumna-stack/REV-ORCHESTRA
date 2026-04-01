import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StackLogos from "@/components/StackLogos";
import Stats from "@/components/Stats";
import StatCallout from "@/components/StatCallout";
import TheShift from "@/components/TheShift";
import PhoneMockup from "@/components/PhoneMockup";
import ProcessVisual from "@/components/ProcessVisual";
import SocialProof from "@/components/SocialProof";
import Compliance from "@/components/Compliance";
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
      <StackLogos />
      <Stats />
      <StatCallout />
      <TheShift />
      <PhoneMockup />
      <ProcessVisual />
      <SocialProof />
      <SectionBlend from="rgb(14,15,17)" to="rgb(8,8,15)" />
      <Compliance />
      <SectionBlend from="rgb(8,8,15)" to="rgb(14,15,17)" />
      <Pricing />
      <FAQ />
      <SectionBlend from="rgb(14,15,17)" to="rgb(8,8,15)" />
      <CTA />
      <SectionBlend from="rgb(14,15,17)" to="rgb(14,15,17)" />
      <Footer />
    </main>
  );
}
