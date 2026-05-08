import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://revorchestra.com";

const staticRoutes = [
  "",
  "/about",
  "/what-we-do",
  "/how-it-works",
  "/products",
  "/packages",
  "/pricing",
  "/blogs",
  "/contact-us",
  "/crypto-networks",
  "/resources",
  "/resources/orchestra",
];

const blogSlugs = [
  "we-can-build-for-you",
  "understanding-defi-protocols",
  "cross-chain-bridges-explained",
  "nft-marketplaces-2026",
  "smart-contract-security",
  "ethereum-layer2-landscape",
  "ai-meets-blockchain",
];

const networkSlugs = ["ethereum", "bitcoin", "polygon", "solana", "avalanche", "arbitrum"];
const legalSlugs = ["terms-conditions", "privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blogs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...networkSlugs.map((slug) => ({
      url: `${BASE}/crypto-networks/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legalSlugs.map((slug) => ({
      url: `${BASE}/legal/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
