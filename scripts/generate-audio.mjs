// Build-time audio generator for Rev Orchestra blog posts.
//
// Reads each post from src/app/blogs/[slug]/page.tsx (statically parsed),
// builds a plain-text narration script, sends it to ElevenLabs, and writes
// MP3 files into public/audio/{slug}.mp3.
//
// Usage:
//   1. Set ELEVENLABS_API_KEY (and optionally ELEVENLABS_VOICE_ID,
//      ELEVENLABS_MODEL_ID) in .env.local
//   2. npm run gen:audio          (skips slugs that already have an MP3)
//      npm run gen:audio -- --force   (regenerates all posts)
//      npm run gen:audio -- --slug=signal-arbitration-b2b-outbound

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// Load .env.local manually (no extra dependency)
function loadEnv() {
  const candidates = [".env.local", ".env"];
  for (const f of candidates) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}
loadEnv();

const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY;
// Default voice: "Adam" (calm, clear, business-friendly). Override via env.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

if (!ELEVEN_KEY) {
  console.error(
    "[gen:audio] ELEVENLABS_API_KEY missing. Add it to .env.local:\n" +
      "  ELEVENLABS_API_KEY=sk_...\n" +
      "  # optional:\n" +
      "  ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB\n" +
      "  ELEVENLABS_MODEL_ID=eleven_multilingual_v2"
  );
  process.exit(1);
}

// --------------------------------------------------------------------------
// Parse posts from src/app/blogs/[slug]/page.tsx
// We avoid importing the .tsx (would need a TS loader). Instead we build a
// parallel JS module that re-exports the post data. Cleanest: keep a JSON
// manifest in this file describing which slugs to render and where to find
// their text. To keep a single source of truth, we read the posts directly
// from the .tsx file by stripping types and evaluating the array.
// --------------------------------------------------------------------------

const PAGE_FILE = join(ROOT, "src", "app", "blogs", "[slug]", "page.tsx");
const src = readFileSync(PAGE_FILE, "utf8");

// Extract posts array via a tolerant regex: from `const posts: BlogPost[] = [`
// to the first `];` that is followed by a blank line + `export function`.
const postsStart = src.indexOf("const posts: BlogPost[] = [");
if (postsStart === -1) {
  console.error("[gen:audio] could not find posts array in page.tsx");
  process.exit(1);
}
const after = src.slice(postsStart);
const arrEnd = after.indexOf("];\n\nexport function generateStaticParams");
if (arrEnd === -1) {
  console.error("[gen:audio] could not find end of posts array");
  process.exit(1);
}
const arrText = after.slice(after.indexOf("["), arrEnd + 1);

// Evaluate the array literal in a sandboxed Function. The data is plain
// JSON-compatible objects + string literals; no runtime imports needed.
let posts;
try {
  posts = new Function(`return (${arrText});`)();
} catch (err) {
  console.error("[gen:audio] failed to evaluate posts array:", err.message);
  process.exit(1);
}

function blockText(b) {
  if (b.type === "p") return b.text;
  if (b.type === "ul")
    return [b.intro ?? "", ...b.items].filter(Boolean).join(". ");
  // table
  const headerLine = b.table.headers.join(" vs ");
  const rowLines = b.table.rows.map((r) => r.join(" versus ")).join(". ");
  return [b.caption ?? "", headerLine, rowLines].filter(Boolean).join(". ");
}

function plainTextForAudio(post) {
  return [
    post.title,
    ...post.sections.flatMap((s) => [
      s.heading ?? "",
      ...s.blocks.map(blockText),
    ]),
  ]
    .filter(Boolean)
    .join(". ");
}

// --------------------------------------------------------------------------
// CLI args
// --------------------------------------------------------------------------
const args = process.argv.slice(2);
const force = args.includes("--force");
const slugArg = args.find((a) => a.startsWith("--slug="))?.split("=")[1];

const targetSlugs = slugArg
  ? posts.filter((p) => p.slug === slugArg).map((p) => p.slug)
  : posts.map((p) => p.slug);

if (targetSlugs.length === 0) {
  console.error(`[gen:audio] no posts matched. Available slugs:`);
  for (const p of posts) console.error("  - " + p.slug);
  process.exit(1);
}

// --------------------------------------------------------------------------
// ElevenLabs API call
// --------------------------------------------------------------------------
const AUDIO_DIR = join(ROOT, "public", "audio");
if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

async function synthesize(slug, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": ELEVEN_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: true,
      },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${errText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = join(AUDIO_DIR, `${slug}.mp3`);
  writeFileSync(out, buf);
  return { out, bytes: buf.length };
}

// --------------------------------------------------------------------------
// Run
// --------------------------------------------------------------------------
console.log(
  `[gen:audio] voice=${VOICE_ID} model=${MODEL_ID} posts=${targetSlugs.length}`
);

let ok = 0;
let skipped = 0;
let failed = 0;

for (const slug of targetSlugs) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) continue;

  const dest = join(AUDIO_DIR, `${slug}.mp3`);
  if (!force && existsSync(dest)) {
    console.log(`  [skip]   ${slug}  (exists; use --force to regenerate)`);
    skipped++;
    continue;
  }

  const text = plainTextForAudio(post);
  // ElevenLabs hard limit is high (~10k chars); chunk if needed.
  if (text.length > 9500) {
    console.warn(
      `  [warn]   ${slug}  text length ${text.length} chars — close to limit`
    );
  }

  process.stdout.write(`  [build]  ${slug} ... `);
  try {
    const { bytes } = await synthesize(slug, text);
    console.log(`✓ ${(bytes / 1024).toFixed(0)} KB`);
    ok++;
  } catch (err) {
    console.log(`✗`);
    console.error(`           ${err.message}`);
    failed++;
  }
}

console.log(
  `\n[gen:audio] done. ok=${ok} skipped=${skipped} failed=${failed}`
);
process.exit(failed > 0 ? 1 : 0);
