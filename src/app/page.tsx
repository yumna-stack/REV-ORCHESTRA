import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnimatedText from "@/components/AnimatedText";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import BlockchainIndexing from "@/components/BlockchainIndexing";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Integrations from "@/components/Integrations";
import SupportedBlockchain from "@/components/SupportedBlockchain";
import AIIntegration from "@/components/AIIntegration";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-[rgb(14,15,17)]">
      <Navigation />
      <Hero />
      <AnimatedText />
      <Features />
      <HowItWorks />
      <Stats />
      <BlockchainIndexing />
      <Pricing />
      <FAQ />
      <Integrations />
      <SupportedBlockchain />
      <AIIntegration />
      <Blog />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
