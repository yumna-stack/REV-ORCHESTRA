"use client";

/* Brand logos — uses local SVGs first, falls back to Clearbit then Google */

const localLogos = new Set([
  "airtable", "apollo", "claude", "clay", "google", "hubspot",
  "instantly", "linkedin", "n8n", "notion", "salesforce", "slack",
  "stripe", "zapier", "zoom",
]);

const domains: Record<string, string> = {
  hubspot: "hubspot.com",
  slack: "slack.com",
  linkedin: "linkedin.com",
  n8n: "n8n.io",
  clay: "clay.com",
  instantly: "instantly.ai",
  claude: "anthropic.com",
  apollo: "apollo.io",
  salesforce: "salesforce.com",
  google: "google.com",
  notion: "notion.so",
  zoom: "zoom.us",
  stripe: "stripe.com",
  airtable: "airtable.com",
  zapier: "zapier.com",
  twitter: "x.com",
};

export default function BrandLogo({
  name,
  size = 32,
  className = "",
  style,
  colored = false,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  colored?: boolean;
}) {
  const key = name.toLowerCase();
  const domain = domains[key];
  if (!domain) return null;

  /* Use local SVG if available, otherwise Clearbit then Google */
  const hasLocal = localLogos.has(key);
  const src = hasLocal ? `/logos/${key}.svg` : `https://logo.clearbit.com/${domain}`;
  const fallbackSrc = hasLocal
    ? `https://logo.clearbit.com/${domain}`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const lastFallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  /* Grey by default; colored when prop is set. */
  const greyFilter = key === "twitter"
    ? "invert(1) grayscale(1) brightness(1.4) contrast(0.85)"
    : "grayscale(1) brightness(1.4) contrast(0.85)";
  const colorFilter = key === "twitter" ? "invert(1)" : undefined;
  const baseFilter = colored ? colorFilter : greyFilter;
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(baseFilter ? { filter: style?.filter ? `${baseFilter} ${style.filter}` : baseFilter } : {}),
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`rounded-sm ${className}`}
      style={mergedStyle}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== fallbackSrc) {
          img.src = fallbackSrc;
        } else if (img.src !== lastFallback) {
          img.src = lastFallback;
        }
      }}
    />
  );
}
