# Karpathy AutoResearch — Setup & GTM Analysis
## Research Summary — April 6, 2026

---

## What Is It?
AutoResearch is a ~630-line Python setup by Andrej Karpathy that runs ML experiments autonomously. An AI agent reads training code, forms a hypothesis, modifies the code, runs a 5-minute experiment, and keeps changes only if they beat the current best. Repeat overnight → wake up to better models.

**GitHub**: https://github.com/karpathy/autoresearch

---

## How It Works

3 files matter:
- **`prepare.py`** — data prep, tokenizer, eval utilities (fixed, not modified)
- **`train.py`** — model + training loop (the AI agent modifies this)
- **`program.md`** — instructions for the AI agent (human modifies this)

The AI agent (Claude Code, Codex, etc.) reads `program.md`, modifies `train.py`, runs for exactly 5 minutes, checks val_bpb (validation bits per byte), keeps improvements, discards failures. Repeat.

---

## Setup Requirements
- **GPU**: Single NVIDIA GPU (tested on H100, community forks for smaller GPUs/MPS)
- **Python**: 3.10+
- **Package manager**: uv (Astral)
- **LLM Agent**: Claude Code, Codex, or similar with file edit permissions

### Quick Start
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install dependencies
uv sync

# One-time data prep (~2 min)
uv run prepare.py

# Manual test run (~5 min)
uv run train.py

# Then point your AI agent at program.md and let it go
```

---

## Notable Results
- Karpathy: 126 experiments overnight, significant loss reduction
- Shopify CEO Tobi Lutke: 19% performance gain overnight
- Community has been creating forks for smaller hardware (MacBooks, consumer GPUs)

---

## Setup Blockers for Our HQ
1. **Requires NVIDIA GPU** — need to check what's available in HQ
2. **Windows compatibility** — may need WSL2 for CUDA support
3. **API keys** — need Claude API key or similar for the autonomous agent

---

## GTM Analysis

### Who Would Buy This?
1. **ML teams at startups** — accelerate hyperparameter search without human time
2. **Research labs** — run more experiments, faster iteration cycles
3. **Enterprise ML teams** — optimize production models overnight
4. **AI consultancies** — offer "overnight model optimization" as a service

### What Pain Does It Solve?
- **ML researchers spend 80% of time on hyperparameter tuning** → automate it
- **GPU time is expensive** → maximize value of each GPU-hour
- **Human bottleneck** → experiments run while you sleep
- **Reproducibility** — every experiment logged with diffs

### Demo Ideas
1. Live demo: start an experiment, show it modifying code in real-time
2. Morning-after: show 50+ experiments completed overnight with loss curve
3. Cost comparison: human researcher vs. AutoResearch on same task
4. Vertical: "optimize your recommendation model while you sleep"

### Best Verticals
- **MLOps platforms** — integrate as a feature
- **Cloud GPU providers** — bundle with GPU rentals
- **AI training companies** — optimize fine-tuning jobs
- **Autonomous driving / robotics** — continuous model improvement
