"use client";

import Link from "next/link";

const footerLinks = {
  main: [
    { label: "What We Do", href: "#agents" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Packages", href: "#pricing" },
  ],
  resources: [
    { label: "Playbooks", href: "/resources" },
    { label: "Blog", href: "/blogs" },
    { label: "The Orchestra", href: "/resources/orchestra" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

const tools = ["n8n", "Claude", "Clay", "Instantly", "HubSpot"];

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-8 bg-[rgb(8,8,15)] border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              </div>
              <span className="text-white font-semibold text-sm">Rev Orchestra</span>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-4">
              The AI GTM System for B2B Founders
            </p>
            <p className="text-xs text-[rgba(255,255,255,0.25)]">
              hello@revorchestra.com
            </p>
          </div>

          {/* Main links */}
          <div>
            <h4 className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-4">Company</h4>
            {footerLinks.main.map((link) => (
              <a key={link.label} href={link.href} className="block text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors py-1.5">{link.label}</a>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-4">Resources</h4>
            {footerLinks.resources.map((link) => (
              <Link key={link.label} href={link.href} className="block text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors py-1.5">{link.label}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-4">Legal</h4>
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="block text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors py-1.5">{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Built with */}
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(255,255,255,0.25)]">
            Built with {tools.join(" · ")}
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.25)]">
            © 2026 Rev Orchestra · US LLC via Stripe Atlas · Team in Sri Lanka & Singapore
          </p>
        </div>
      </div>
    </footer>
  );
}
