import Navigation from "@/components/Navigation";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Hero from "@/components/Hero";
import AnimatedText from "@/components/AnimatedText";
import ProblemSection from "@/components/ProblemSection";
import TheShift from "@/components/TheShift";
import CommandCenter from "@/components/CommandCenter";
import HowItWorks from "@/components/HowItWorks";
import SixAgents from "@/components/SixAgents";
import SocialProof from "@/components/SocialProof";
import Compliance from "@/components/Compliance";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-[rgb(8,8,15)]">
      <AnnouncementBanner />
      <Navigation />
      <Hero />
      <AnimatedText />
      <ProblemSection />
      <TheShift />
      <CommandCenter />
      <HowItWorks />
      <SixAgents />
      <SocialProof />
      <Compliance />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
