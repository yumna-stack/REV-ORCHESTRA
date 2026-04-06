# How to Operate — Revorchestra Setup
# Quick Reference for Yumna

---

## 🔑 FIRST: Always Set Your API Key
Open any terminal and run:
```
set GEMINI_API_KEY=AIzaSyAJbuz9_nePwPkL2pd2ltI4y9xFom79K74
set GOOGLE_API_KEY=AIzaSyAJbuz9_nePwPkL2pd2ltI4y9xFom79K74
```

---

## 1. PAPERCLIP (AI Company Platform)

**Start the server:**
```bash
cd "D:\Danny bossa\framer\Paperclip\paperclip\server"
set GEMINI_API_KEY=AIzaSyAJbuz9_nePwPkL2pd2ltI4y9xFom79K74
npx tsx src/index.ts
```

**Open in browser:** http://localhost:3100

**What you'll see:**
- Revorchestra dashboard
- Agents panel (CEO agent already created)
- Issues, Org chart, Costs, Activity, Settings

**Key actions in the UI:**
- Click **+ next to AGENTS** → hire a new AI agent
- Click **Create (pencil icon)** → create a new task/issue
- Click **Org** → see the company org chart
- Click **Costs** → see agent spending

---

## 2. PI (AI Coding Agent)

**Chat mode (interactive):**
```bash
pi --provider google --model gemini-2.5-flash
```
Then type messages like you're chatting with a developer.

**One-shot mode (give task, get answer):**
```bash
pi -p "Read README.md and summarize it" --provider google --model gemini-2.5-flash
pi -p "Create a Python hello world script" --provider google --model gemini-2.5-flash
pi -p "Find all TODO comments in this project" --provider google --model gemini-2.5-flash
```

**Pi's tools:** read, write, edit, bash, grep, find, ls

**Rate limit:** 20 requests/day on free tier (gemini-2.5-flash)

---

## 3. SECOND BRAIN (Auto-Wiki)

**Location:** `D:\Danny bossa\framer\Paperclip\test-wiki\`

**To add new research:**
1. Save articles/papers as .md files in `test-wiki/raw/`
2. Open Claude Code in the test-wiki folder
3. Say: "Ingest the new sources into the wiki"
4. Wiki auto-updates in `test-wiki/wiki/`

**To browse the wiki:**
- Open any file in `test-wiki/wiki/` with a text editor or VS Code
- Or use Obsidian (free app) for the best experience with wikilinks
- `wiki/index.md` is the starting point

**Current wiki topic:** Agent Economy
**Pages:** 11 (3 concepts, 2 entities, 1 source, overview, index, log, schema)

---

## 4. AUTORESEARCH (Autonomous ML Experiments)

**Location:** `D:\Danny bossa\framer\Paperclip\autoresearch\`

**Status:** Setup complete, but NEEDS NVIDIA GPU to run experiments

**If you get a GPU machine:**
```bash
cd autoresearch
uv sync
uv run prepare.py          # downloads data + trains tokenizer
uv run train.py             # runs a 5-minute training experiment
```

**To run autonomous mode:**
Point Claude Code or Codex at `program.md` and say:
"Have a look at program.md and let's kick off a new experiment!"

The agent will modify train.py, run experiments, keep improvements, discard failures.
Leave it overnight = ~100 experiments.

---

## 5. RESEARCH DOCS

All GTM research is in `D:\Danny bossa\framer\Paperclip\research\`:
- `task2-agent-communication-economy.md` — A2A, MCP, agent economy
- `task3-autoresearch.md` — AutoResearch GTM analysis
- `task4-second-brain.md` — Second Brain GTM analysis

---

## PUSHED TO GITHUB
All files are at: https://github.com/yumna-stack/REV-ORCHESTRA
Under the `paperclip/` folder.
