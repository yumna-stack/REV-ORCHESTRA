"use client";

/* Brand logos.
 *
 *  Rendering priority (for each brand):
 *   1. simple-icons package → inline SVG with real trademark path data.
 *   2. <img> pointing directly to the brand's OWN favicon at their own
 *      domain. Not Clearbit, not Google — the actual file the brand
 *      publishes at domain.com/favicon.ico. It is by definition the real
 *      logo because the brand itself serves it.
 *
 *  Greyscale by default to match the site's monochrome aesthetic.
 *  Pass `colored` to render in brand color.
 */

import * as si from "simple-icons";

type IconDef = { hex: string; path: string };

const fromSI = (key: string): IconDef | null => {
  const obj = (si as unknown as Record<string, IconDef | undefined>)[key];
  return obj ? { hex: `#${obj.hex}`, path: obj.path } : null;
};

/* Key → simple-icons export name.
 * Only include brands the simple-icons npm package actually ships. */
const SI_KEY: Record<string, string> = {
  hubspot: "siHubspot",
  n8n: "siN8n",
  claude: "siClaude",
  notion: "siNotion",
  zoom: "siZoom",
  stripe: "siStripe",
  airtable: "siAirtable",
  zapier: "siZapier",
  twitter: "siX",
  x: "siX",
  google: "siGoogle",
  posthog: "siPosthog",
  intercom: "siIntercom",
  mixpanel: "siMixpanel",
  datadog: "siDatadog",
  linear: "siLinear",
  figma: "siFigma",
  framer: "siFramer",
  supabase: "siSupabase",
  vercel: "siVercel",
  github: "siGithub",
  calendly: "siCalendly",
  discord: "siDiscord",
  dropbox: "siDropbox",
  gmail: "siGmail",
  googledocs: "siGoogledocs",
  googlesheets: "siGooglesheets",
  loom: "siLoom",
};

/* Brands where the user has dropped a real logo file into /public/logos/.
 * This takes priority over everything — use it when you've sourced the
 * official brand asset from a press kit and want crisp rendering.
 *
 * Only ICON-ONLY (square) assets belong here. Wordmark PNGs (logo+text)
 * were removed — they rendered at wildly different visual sizes. For those
 * brands we now fall back to simple-icons or the brand favicon, which are
 * consistently square.
 */
const LOCAL_LOGO: Record<string, string> = {
  /* LinkedIn — canonical brand mark, not the Sales Navigator variant */
  linkedin: "/logos/linkedin.svg",
  /* Slack + Salesforce — real multi-color SVGs we committed to /public/logos */
  slack: "/logos/slack.svg",
  salesforce: "/logos/salesforce.svg",
};

/* Fallback — use the brand's own favicon, directly from their own domain.
 * These are real brand-published assets. */
const FAVICON_URL: Record<string, string> = {
  slack: "https://slack.com/favicon.ico",
  linkedin: "https://www.linkedin.com/favicon.ico",
  salesforce: "https://www.salesforce.com/favicon.ico",
  clay: "https://www.clay.com/favicon.ico",
  instantly: "https://instantly.ai/favicon.ico",
  apollo: "https://www.apollo.io/favicon.ico",
  heyreach: "https://heyreach.io/favicon.ico",
  exa: "https://exa.ai/favicon.ico",
  outreach: "https://www.outreach.io/favicon.ico",
  salesloft: "https://salesloft.com/favicon.ico",
  gong: "https://www.gong.io/favicon.ico",
  lusha: "https://www.lusha.com/favicon.ico",
  clearbit: "https://clearbit.com/favicon.ico",
  pipedrive: "https://www.pipedrive.com/favicon.ico",
  segment: "https://segment.com/favicon.ico",
  amplitude: "https://amplitude.com/favicon.ico",
  openai: "https://openai.com/favicon.ico",
  canva: "https://www.canva.com/favicon.ico",
  chatgpt: "https://openai.com/favicon.ico",
  gemini: "https://gemini.google.com/favicon.ico",
  perplexity: "https://www.perplexity.ai/favicon.ico",
  anthropic: "https://www.anthropic.com/favicon.ico",
  cursor: "https://www.cursor.com/favicon.ico",
  codeium: "https://codeium.com/favicon.ico",
  replit: "https://replit.com/favicon.ico",
  webflow: "https://webflow.com/favicon.ico",
  retool: "https://retool.com/favicon.ico",
  make: "https://www.make.com/favicon.ico",
  attio: "https://attio.com/favicon.ico",
  smartlead: "https://www.smartlead.ai/favicon.ico",
  lemlist: "https://www.lemlist.com/favicon.ico",
  reply: "https://reply.io/favicon.ico",
  woodpecker: "https://woodpecker.co/favicon.ico",
  persana: "https://www.persana.ai/favicon.ico",
  warmly: "https://warmly.ai/favicon.ico",
  sendspark: "https://sendspark.com/favicon.ico",
  vidyard: "https://www.vidyard.com/favicon.ico",
  typeform: "https://www.typeform.com/favicon.ico",
};

/* Expand the domains map so brand→domain inference works everywhere. */
const DOMAIN: Record<string, string> = {
  slack: "slack.com",
  linkedin: "linkedin.com",
  salesforce: "salesforce.com",
  clay: "clay.com",
  instantly: "instantly.ai",
  apollo: "apollo.io",
  heyreach: "heyreach.io",
  exa: "exa.ai",
  outreach: "outreach.io",
  salesloft: "salesloft.com",
  gong: "gong.io",
  lusha: "lusha.com",
  clearbit: "clearbit.com",
  pipedrive: "pipedrive.com",
  segment: "segment.com",
  amplitude: "amplitude.com",
  openai: "openai.com",
  canva: "canva.com",
  chatgpt: "openai.com",
  gemini: "gemini.google.com",
  perplexity: "perplexity.ai",
  anthropic: "anthropic.com",
  cursor: "cursor.com",
  codeium: "codeium.com",
  replit: "replit.com",
  webflow: "webflow.com",
  retool: "retool.com",
  make: "make.com",
  attio: "attio.com",
  smartlead: "smartlead.ai",
  lemlist: "lemlist.com",
  reply: "reply.io",
  woodpecker: "woodpecker.co",
  persana: "persana.ai",
  warmly: "warmly.ai",
  sendspark: "sendspark.com",
  vidyard: "vidyard.com",
  typeform: "typeform.com",
};

/* Human-readable display names. Extend as needed. Falls back to `name`
 * verbatim (capitalized) for anything not listed. */
const DISPLAY_NAME: Record<string, string> = {
  hubspot: "HubSpot",
  linkedin: "LinkedIn",
  heyreach: "HeyReach",
  smartlead: "Smartlead",
  n8n: "n8n",
  x: "X",
  twitter: "Twitter",
};

const displayName = (name: string) =>
  DISPLAY_NAME[name.toLowerCase()] ?? name.charAt(0).toUpperCase() + name.slice(1);

/* ═══════════════════════════════════════════════════════════════════
 * BrandMark — the symbol only. Always square. Sized by `size` prop.
 *
 * Geist guidance (https://vercel.com/geist/brand): use a Mark only when
 * (a) there isn't room for a Wordmark, or (b) many brand symbols are
 * shown together (e.g. a tech strip). Otherwise prefer BrandWordmark.
 *
 * `colored` defaults to false to match the site's existing monochrome
 * aesthetic, but Geist recommends brand color unless the context
 * demands monochrome — flip it on when the logo is a focal element.
 *
 * `safetyArea` wraps the mark in padding equal to the symbol size,
 * per Geist's "safety area = height of symbol" rule. Default off.
 * ═══════════════════════════════════════════════════════════════════ */
export function BrandMark({
  name,
  size = 32,
  className = "",
  style,
  colored = false,
  safetyArea = false,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  colored?: boolean;
  safetyArea?: boolean;
}) {
  const key = name.toLowerCase();

  /* Greyscale filter — matches pre-existing site aesthetic */
  const greyFilter =
    key === "twitter" || key === "x"
      ? "invert(1) grayscale(1) brightness(1.4) contrast(0.85)"
      : "grayscale(1) brightness(1.4) contrast(0.85)";
  const mergedFilter = colored
    ? style?.filter
    : style?.filter
    ? `${greyFilter} ${style.filter}`
    : greyFilter;

  let inner: React.ReactNode;

  /* 0. User-provided local asset wins over everything. */
  const local = LOCAL_LOGO[key];
  if (local) {
    inner = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={local}
        alt={name}
        width={size}
        height={size}
        className={className}
        style={{ ...style, filter: mergedFilter, objectFit: "contain" }}
        loading="lazy"
      />
    );
  } else {
    /* 1. simple-icons brand? Render inline SVG. */
    const siKey = SI_KEY[key];
    const def = siKey ? fromSI(siKey) : null;
    if (def) {
      const fill = colored ? def.hex : "#d4d4d4";
      inner = (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ ...style, filter: style?.filter }}
          aria-label={name}
        >
          <path d={def.path} fill={fill} />
        </svg>
      );
    } else {
      /* 2. Favicon fallback — route through Google's s2 service.
       *    Direct brand-domain favicons are frequently blocked by ORB/CORB,
       *    and many brands serve wordmark PNGs at /favicon.ico rather than
       *    a square icon. Google's s2 service always returns a square PNG
       *    and is not subject to cross-origin blocking. */
      const domain = DOMAIN[key];
      const favicon = domain ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}` : null;
      if (favicon) {
        inner = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={favicon}
            alt={name}
            width={size}
            height={size}
            className={className}
            style={{ ...style, filter: mergedFilter, objectFit: "contain" }}
            loading="lazy"
          />
        );
      } else {
        /* 3. Unknown brand — letter-mark placeholder. */
        inner = (
          <span
            className={className}
            aria-label={name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: size,
              height: size,
              borderRadius: size * 0.2,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              fontSize: size * 0.4,
              fontWeight: 600,
              ...style,
            }}
          >
            {name[0]?.toUpperCase()}
          </span>
        );
      }
    }
  }

  if (!safetyArea) return inner;
  return (
    <span
      style={{
        display: "inline-flex",
        padding: size,
        boxSizing: "content-box",
      }}
    >
      {inner}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * BrandWordmark — the symbol + brand name as a single unit.
 *
 * Sized by `height` (not `size`) because wordmark aspect ratios vary
 * per brand — Geist's API mirrors this. The mark renders at `height`
 * square; the label uses `height * 0.7` so both read at the same weight.
 *
 * Use this wherever you'd otherwise hand-roll `<BrandMark/><span/>`.
 * ═══════════════════════════════════════════════════════════════════ */
export function BrandWordmark({
  name,
  height = 24,
  className = "",
  gap,
  colored = false,
  style,
}: {
  name: string;
  height?: number;
  className?: string;
  gap?: number;
  colored?: boolean;
  style?: React.CSSProperties;
}) {
  const labelSize = Math.round(height * 0.75);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: gap ?? Math.round(height * 0.4),
        ...style,
      }}
    >
      <BrandMark name={name} size={height} colored={colored} />
      <span
        style={{
          fontSize: labelSize,
          fontWeight: 600,
          lineHeight: 1,
          color: "var(--text)",
        }}
      >
        {displayName(name)}
      </span>
    </span>
  );
}

/* Back-compat default export — existing callers use <BrandLogo name=... size=...>
 * which matches BrandMark's signature. */
export default BrandMark;
