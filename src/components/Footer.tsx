"use client";

const footerLinks = {
  Company: [
    { label: "Products", href: "#features" },
    { label: "About", href: "#stats" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Community", href: "#" },
    { label: "Support", href: "#contact" },
  ],
};

const socialIcons = [
  { name: "Twitter", svg: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { name: "LinkedIn", svg: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
  { name: "GitHub", svg: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-black-dark border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo, tagline & social icons */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-semibold text-base tracking-[1.5px] uppercase">
              REVORCHESTRA
            </span>
            <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%]">
              Revolutionizing crypto with advanced AI technology. A simple, fast, and secure platform.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-accent-orange/15 hover:border-accent-orange/25 transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for layout */}
          <div className="hidden md:block" />

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <span className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider font-medium">
                {title}
              </span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-xs text-[rgba(255,255,255,0.3)]">
            &copy; {new Date().getFullYear()} REVORCHESTRA. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[rgba(255,255,255,0.3)] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[rgba(255,255,255,0.3)] hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
