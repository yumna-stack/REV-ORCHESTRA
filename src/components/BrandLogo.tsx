"use client";

/* Uses Google's favicon service to get REAL brand logos at runtime */

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
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const key = name.toLowerCase();
  const domain = domains[key];
  if (!domain) return null;

  /* Always request max 128px for HD quality */
  const src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  /* X/Twitter favicon is black — invert it so it's visible on dark backgrounds */
  const needsInvert = key === "twitter";
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(needsInvert && !style?.filter
      ? { filter: "invert(1) grayscale(1) brightness(1.4) contrast(0.85)" }
      : needsInvert && style?.filter
        ? { filter: `invert(1) ${style.filter}` }
        : {}),
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
    />
  );
}
