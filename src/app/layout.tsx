import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = "https://revorchestra.com";
const SITE_TITLE = "Rev Orchestra, AI GTM System for B2B Founders";
const SITE_DESCRIPTION =
  "Rev Orchestra builds AI orchestrated GTM systems for B2B founders who just raised and need pipeline. Autonomous AI agents, connected to your stack, running 24/7. Yours permanently in 90 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Rev Orchestra",
    images: [{ url: "/icon.svg", width: 32, height: 32, alt: "Rev Orchestra" }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icon.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
