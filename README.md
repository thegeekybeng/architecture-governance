# architecture-governance

> AI Architecture Governance skills for Antigravity (and any compatible agent).

Three skills covering the full project lifecycle — from pre-project documentation gates through live compliance verification and security auditing.

## Skills

### `governance` — Master lifecycle skill (5 modes)

| Mode | Trigger | What it does |
|------|---------|-------------|
| `scaffold` | "set up the project", "init .ai-arch/" | Initialize `.ai-arch/` structure from TOGAF ADM Preliminary + Phase A |
| `adr` | "write an ADR", any tech choice | Architecture Decision Records with mandatory rejected alternatives |
| `verify` | "verify compliance", "check governance" | Deterministic gate checker (`--fast` existence-only / `--deep` content check) |
| `diagram` | "draw [type]" | Mermaid diagrams: context, container, sequence, deployment, state, ERD, dataflow |
| `audit` | "audit this", "audit <path>" | 5-pillar code audit with CWE/OWASP citations and weighted scoring |

**Audit scoring formula (fixed, v1.0 — audits are comparable over time):**
- Security 30% · Tech Debt 25% · Deployability 20% · Privacy 15% · Scalability 10%
- CRITICAL: -3.0 · HIGH: -2.0 · MEDIUM: -0.5 · LOW: -0.1

### `ai-compliance-framework` — Regulatory mapping (3 modes)

| Mode | Trigger | What it does |
|------|---------|-------------|
| `map` | "compliance mapping", "AI compliance check" | Translate governance standards → technical directives per jurisdiction + sector |
| `compare` | "compare frameworks" | Compare agent architectures (LangGraph/CrewAI/AutoGen/etc.) against compliance |
| `handoff` | "policy handoff", "multi-national compliance" | Generate jurisdiction-switching protocols for cross-border AI |

Covers: EU AI Act · Singapore AIGF · NIST AI RMF · UK · China · Australia · Japan · South Korea · Canada · ASEAN · ISO 42001 · OECD

Sectors: Government · Healthcare · Finance (MAS) · Critical Infrastructure · Oil & Gas · Education · HR · Law Enforcement

### `vuln-scanner` — DAST for live targets

Point it at a live URL, get a structured external vulnerability assessment.

---

## Install

```bash
npx skills add thegeekybeng/architecture-governance
```

For a specific skill only:

```bash
npx skills add thegeekybeng/architecture-governance@governance
npx skills add thegeekybeng/architecture-governance@ai-compliance-framework
```

---

## Skill Classification

| Skill | Mode | Class |
|-------|------|-------|
| governance | verify, adr | **DETERMINISTIC** — reproducible without AI |
| governance | scaffold | **GROUNDED** — TOGAF-cited, source-traced |
| ai-compliance-framework | map, compare, handoff | **GROUNDED** — regulatory articles cited with confidence levels |
| governance | audit, diagram | **MODEL-JUDGMENT** — requires interpretation; CWE/OWASP citations are grounded |
| vuln-scanner | all | **GROUNDED** — external tool results, model interprets |

**What this bundle does NOT do:**
- `ai-compliance-framework` is developer guidance, not legal advice
- `audit` findings need developer verification before action
- `verify` checks structural gates, not semantic correctness of content
- No skill replaces a qualified security auditor for production systems

---

## Requirements

- Any AI agent that supports the skills.sh protocol
- Tested with: Antigravity
- `.ai-arch/` folder structure is gitignored by design — it's internal governance working notes

---

## License

MIT
