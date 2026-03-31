import Navigation from "@/components/Navigation";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Hero from "@/components/Hero";
import StackLogos from "@/components/StackLogos";
import AnimatedText from "@/components/AnimatedText";
import Stats from "@/components/Stats";
import ProblemSection from "@/components/ProblemSection";
import StatCallout from "@/components/StatCallout";
import TheShift from "@/components/TheShift";
import CommandCenter from "@/components/CommandCenter";
import ProcessVisual from "@/components/ProcessVisual";
import HowItWorks from "@/components/HowItWorks";
import PhoneMockup from "@/components/PhoneMockup";
import SixAgents from "@/components/SixAgents";
import SocialProof from "@/components/SocialProof";
import Compliance from "@/components/Compliance";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-[rgb(14,15,17)]">
      <AnnouncementBanner />
      <Navigation />
      <Hero />
      <StackLogos />
      <AnimatedText />
      <Stats />
      <ProblemSection />
      <StatCallout />
      <TheShift />
      <CommandCenter />
      <ProcessVisual />
      <HowItWorks />
      <PhoneMockup />
      <SixAgents />
      <SocialProof />
      <Compliance />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
