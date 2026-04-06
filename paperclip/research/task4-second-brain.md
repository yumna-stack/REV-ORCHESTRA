# Karpathy Second Brain (LLM Wiki) — Setup & GTM Analysis
## Research Summary — April 6, 2026

---

## What Is It?
Karpathy's "Second Brain" is a system where an LLM acts as a research librarian — you dump raw materials (papers, articles, repos) into a folder, and the AI builds and maintains an interlinked wiki of structured knowledge. His wiki grew to ~100 articles and ~400,000 words on a single topic.

**Original Gist**: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
**Community Implementation**: https://github.com/toolboxmd/karpathy-wiki
**Alternative Implementation**: https://github.com/Astro-Han/karpathy-llm-wiki

---

## How It Works

### Three-Stage Pipeline:

1. **Data Ingest** — Dump raw research materials into a `raw/` directory
   - Papers, blog posts, GitHub READMEs, web articles
   - Uses Obsidian Web Clipper to convert web → Markdown
   - Images stored locally for LLM vision capabilities

2. **Compilation** — LLM "compiles" raw data into structured wiki
   - Generates summaries and encyclopedia-style articles
   - Creates backlinks between related concepts
   - Categorizes and organizes knowledge hierarchically

3. **Active Maintenance** — LLM runs "health checks" / "linting"
   - Scans for inconsistencies and missing connections
   - Updates articles as new raw material is added
   - Maintains backlink integrity

### Key Design Choice: No RAG
- Instead of retrieval-augmented generation, the LLM maintains a living Markdown library
- The wiki IS the knowledge base — no vector DB, no embeddings
- Everything is plain Markdown files — version-controllable, human-readable

---

## Repos Cloned

### 1. `second-brain/` (toolboxmd/karpathy-wiki)
- Claude Code skills for building persistent knowledge bases
- Two skill variants: `karpathy-wiki` and `karpathy-project-wiki`
- Ready to use with Claude Code

### 2. `second-brain-alt/` (Astro-Han/karpathy-llm-wiki)
- Single SKILL.md file implementation
- Includes reference materials and assets
- MIT licensed

---

## Setup Requirements
- **LLM**: Claude Code (or any agent with file editing capabilities)
- **Storage**: Local filesystem (Markdown files)
- **Optional**: Obsidian for viewing/navigating the wiki
- **No GPU required** — runs on API calls

### Quick Start
```bash
# Using the Claude Code skill approach:
# 1. Copy the skill into your Claude Code skills directory
# 2. Create a raw/ folder with your research materials
# 3. Run the skill to build the wiki

# Or manually:
# 1. Create a folder structure: raw/, wiki/, index.md
# 2. Dump PDFs, articles, notes into raw/
# 3. Point Claude at the gist instructions and let it build
```

---

## GTM Analysis

### Who Would Buy This?
1. **Research teams** — organize literature reviews, track state of the art
2. **Knowledge workers / analysts** — synthesize reports from multiple sources
3. **Product teams** — maintain living product knowledge bases
4. **Legal/compliance teams** — track regulations across jurisdictions
5. **Students / academics** — build comprehensive study wikis

### What Pain Does It Solve?
- **Information overload** — too many papers/articles to track manually
- **Knowledge silos** — insights trapped in individual notes
- **Stale documentation** — wikis that nobody updates → AI maintains them
- **Connection blindness** — humans miss links between concepts → AI finds them

### Demo Ideas
1. Feed it 20 papers on a topic → show the auto-generated wiki in 30 minutes
2. Add a new paper → show how it automatically updates related articles
3. Compare: manual wiki vs. AI-maintained wiki on same corpus
4. Show the backlink graph — concepts connected across domains

### Best Verticals
- **Research & Development** — any company doing R&D
- **Consulting firms** — knowledge management across engagements
- **Healthcare** — medical literature tracking
- **Legal** — case law and regulation tracking
- **Education** — course material organization

### Positioning
> "Your AI research librarian — dump your sources, get an auto-maintained wiki that stays current, finds connections you'd miss, and grows with your knowledge."
