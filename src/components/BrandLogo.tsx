"use client";

/* Uses Google's favicon service to get REAL brand logos at runtime */
/* These load in the user's browser, not during build */

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
};

export default function BrandLogo({
  name,
  size = 32,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const domain = domains[name.toLowerCase()];
  if (!domain) return null;

  /* Google S2 favicon API — returns real brand favicons/logos */
  const src = `https://www.google.com/s2/favicons?domain=${domain}&sz=${Math.min(size * 2, 128)}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`rounded-sm ${className}`}
      loading="lazy"
    />
  );
}
