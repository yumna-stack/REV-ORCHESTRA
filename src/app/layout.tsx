import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Rev Orchestra — AI GTM System for B2B Founders",
  description:
    "Rev Orchestra builds AI-orchestrated GTM systems for B2B founders who just raised and need pipeline. Six AI agents, connected to your stack, running 24/7. Yours permanently in 90 days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>{children}</body>
    </html>
  );
}
