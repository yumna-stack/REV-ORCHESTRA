"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/PageWrapper";

export default function NotFound() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <section className="relative w-full min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative z-10 text-center flex flex-col items-center gap-6 px-5">
          <span className="text-[120px] font-bold text-accent-orange/20 leading-none">404</span>
          <h1 className="text-[clamp(28px,4vw,44px)] font-medium text-white -mt-8">Page Not Found</h1>
          <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[400px]">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <CTAButton text="BACK TO HOME" href="/" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
