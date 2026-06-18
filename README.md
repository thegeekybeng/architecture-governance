<h1 align="center">architecture-governance</h1>

<p align="center">
  <strong>Architectural governance skills for AI agents</strong><br/>
  TOGAF-mapped documentation · Deterministic compliance verification · CWE/OWASP-cited code audits
</p>

<p align="center">
  <img src="https://img.shields.io/badge/skills-4-6366f1?style=flat-square" />
  <img src="https://img.shields.io/badge/modes-11-0ea5e9?style=flat-square" title="4 skills, 11 modes total — governance (6 modes), ai-compliance-framework (3 modes), vuln-scanner (1 mode), taskmaster (1 mode)" />
  <img src="https://img.shields.io/badge/agents-Antigravity%20%7C%20Codex%20%7C%20Gemini%20CLI-22c55e?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" />
</p>

---

## The Problem

Most AI-augmented projects start with code. Architecture decisions get made implicitly, never recorded. Security findings have no consistent severity language. There is no way to tell, weeks later, whether governance was applied or just assumed.

This skill bundle enforces the gate before the first line of code, verifies it deterministically, and gives every audit a comparable score.

---

## Install

```bash
npx skills add thegeekybeng/architecture-governance
```

Or install one skill at a time:

```bash
npx skills add thegeekybeng/architecture-governance@governance
npx skills add thegeekybeng/architecture-governance@ai-compliance-framework
npx skills add thegeekybeng/architecture-governance@vuln-scanner
npx skills add thegeekybeng/architecture-governance@taskmaster
```

> Verified working: tested with Antigravity CLI, Codex, Gemini CLI. The installer clones from GitHub, detects 4 skills, and maps them to the target agent automatically.

---

## Uninstall

```bash
# Remove all four skills
npx skills remove governance governance-encoded vuln-scanner taskmaster -g

# Remove one at a time
npx skills remove governance -g
npx skills remove governance-encoded -g
npx skills remove vuln-scanner -g
npx skills remove taskmaster -g

# Interactive selection (no arguments)
npx skills remove
```

> Note: the `ai-compliance-framework` skill installs under the name `governance-encoded` (its internal skill name). Use that name with `remove`.

---

### `governance` — Master lifecycle skill

Six modes, one skill. Dispatch by trigger phrase. (Bundle totals: 4 skills, 11 modes — 6 governance + 3 ai-compliance-framework + 1 vuln-scanner + 1 taskmaster.)

| Mode | Trigger | Output |
|------|---------|--------|
| `scaffold` | *"set up the project"*, *"init .ai-arch/"* | `.ai-arch/` with 8 TOGAF-mapped files |
| `adr` | *"write an ADR"*, any tech choice | Appended ADR with mandatory rejected alternatives |
| `verify` | *"verify compliance"*, *"check governance"* | Gate report — `--fast` (DETERMINISTIC, default) or `--deep` (MODEL-JUDGMENT) |
| `diagram` | *"draw ERD"*, *"draw context diagram"*, etc. | Mermaid diagram in `.ai-arch/diagrams/` |
| `audit` | *"audit this"*, *"audit <path>"* | 5-pillar report with weighted score |
| `sanitize` | *"sanitize PII"*, *"obfuscate network"* | Scrubbed text/code output replacing sensitive data |

#### `verify` mode — example output

```
# Compliance Verification Report

Repo: ./my-project   Date: 2026-06-18   Mode: --fast

## Gate Results

| Gate                      | Status      | Detail                                          |
|---------------------------|-------------|-------------------------------------------------|
| .ai-arch/ presence        | ✅ PASS     | 8/8 files present                               |
| ADR quality               | ⚠️ PARTIAL  | 2 of 4 ADRs missing rejected alternatives       |
| Data classification       | ✅ PASS     | DATAFLOW.md and ERD.md present                  |
| AI governance             | ❌ FAIL     | AI component found; no governance framework doc |
| NFR completeness          | ✅ PASS     | Performance, Security, Retention confirmed      |

Score: 3.5/5   Status: PARTIALLY COMPLIANT
```

#### `audit` mode — scoring formula (fixed, v1.0)

Audits are **comparable over time** because the formula never changes.

```
Pillar weights:   Security 30% · Tech Debt 25% · Deployability 20% · Privacy 15% · Scalability 10%
Deductions:       CRITICAL −3.0 · HIGH −2.0 · MEDIUM −0.5 · LOW −0.1  (pillar min = 0)
Weighted overall: Σ (pillar_score × weight)
```

Every security finding cites a CWE ID and OWASP 2021 category. No citation = downgraded to `INFO`.

Example scorecard:

```
| Pillar        | Weight | Score   | CRITICAL | HIGH | MEDIUM | LOW |
|---------------|--------|---------|----------|------|--------|-----|
| Security      | 30%    | 7.5/10  | 0        | 1    | 3      | 2   |
| Tech Debt     | 25%    | 8.0/10  | 0        | 0    | 4      | 6   |
| Deployability | 20%    | 9.0/10  | 0        | 0    | 2      | 1   |
| Privacy       | 15%    | 9.0/10  | 0        | 0    | 1      | 0   |
| Scalability   | 10%    | 8.0/10  | 0        | 0    | 2      | 3   |
| Weighted      | 100%   | 8.1/10  | 0        | 1    | 12     | 12  |
```

Audit history is stored in `.ai-arch/AUDIT_SCORES.json` — structured JSON so every future session can compute the trend without parsing markdown.

#### `scaffold` mode — TOGAF ADM mapping

The 8 files created map directly to TOGAF ADM Phase Preliminary + Phase A deliverables:

| File | TOGAF Phase | Deliverable |
|------|-------------|------------|
| `03_PRE_PROJECT_CHECKLIST.md` | Preliminary | Architecture Principles + Capability Assessment |
| `02_PROJECT_CONTEXT.md` | Phase A | Statement of Architecture Work |
| `06_ARCHITECTURE_OVERVIEW.md` | Phase A | Architecture Vision (Mermaid layer diagram) |
| `07_ARCHITECTURE_DECISIONS.md` | A–D | Architecture Decision Log (append-only) |
| `diagrams/` | B–D | Architecture Definition Document — domain views |

Source: TOGAF® Standard, 10th Edition (Open Group, 2022).

---

### `ai-compliance-framework` — Regulatory mapping

Three modes. Covers 12 jurisdictions and 9 sectors.

| Mode | Trigger | Output |
|------|---------|--------|
| `map` | *"AI compliance check"*, *"compliance mapping"* | Technical Directive Cards per governance dimension |
| `compare` | *"compare frameworks"*, *"LangGraph vs CrewAI"* | Compliance matrix across agent architectures |
| `handoff` | *"policy handoff"*, *"multi-national compliance"* | Jurisdiction-switching protocol + conflict matrix |

**Jurisdictions:** EU AI Act · Singapore AIGF + Agentic AI Framework 2026 · NIST AI RMF · UK · China · Australia · Japan · South Korea · Canada · ASEAN · ISO 42001 · OECD

**Sectors:** Government · Healthcare · Finance (MAS FEAT) · Critical Infrastructure · Oil & Gas (IEC 61511/61508) · Education · HR · Law Enforcement · General / Cross-sector

Every requirement cites a specific article, principle, or section with confidence levels (HIGH / MEDIUM / LOW). Mandatory vs. voluntary is always distinguished.

> **Disclaimer:** This skill provides developer guidance, not legal advice. Verify requirements against official sources before making compliance decisions.

---

### `vuln-scanner` — External vulnerability scanning (DAST)

Orchestrates Nuclei + nmap + httpx for live target assessment. Requires explicit legal acknowledgment before any scan executes.

**Mandatory tools:** `nuclei`, `nmap`, `httpx` (install instructions built into the skill). Docker alternatives provided.

**Not for:** source code analysis (use a SAST tool), dependency auditing, or targets you do not own.

---

### `taskmaster` — Strict Execution Protocol

Enforces rigid AI behavioural rules: no conversational filler, mandatory up-front alternative considerations, and research-first resolution pathways.

**Features:**
- Kills open-ended conversational questions ("What's next?").
- Limits clarifying questions to max 3, strictly at the beginning of a task.
- Forces the agent to cite sources and provide confidence scoring (`HIGH`/`MEDIUM`/`LOW`).
- Ensures alternative solutions are proposed before implementation, not as an afterthought.

---

## Skill Classification

This bundle is honest about what each mode can and cannot guarantee:

| Mode | Class | What it means |
|------|-------|---------------|
| `verify` | **DETERMINISTIC** | File existence + pattern checks. Same input → same output. AI-free findings. |
| `adr` | **DETERMINISTIC** | Format enforcement. Structural rules, not interpretation. |
| `scaffold` | **GROUNDED** | TOGAF-cited structure. Every file maps to a published deliverable. |
| `ai-compliance-framework` | **GROUNDED** | Regulatory articles cited with confidence levels and source dates. |
| `audit` | **MODEL-JUDGMENT + GROUNDED** | Findings need interpretation; CWE/OWASP citations are grounded. |
| `diagram` | **MODEL-JUDGMENT** | Content quality assessed by model; mandatory conditions are rule-enforced. |
| `sanitize` | **MODEL-JUDGMENT** | Contextual redaction via model; reduces exposure but requires human verification. |
| `vuln-scanner` | **GROUNDED** | Tool-generated findings; model interprets, not originates. |
| `taskmaster` | **DETERMINISTIC** | Behavioural rules enforced structurally, not interpreted. |

**What this bundle does NOT do:**
- Replace a qualified security auditor for production systems
- Guarantee complete PII or sensitive-data removal (`sanitize` mode reduces exposure, but output **MUST** be human-verified before sensitive data leaves a trusted boundary)
- Provide legally binding compliance advice
- Check semantic correctness of governance document content (--fast mode)
- Guarantee completeness of regulatory coverage
- Constrain agent behaviour perfectly (taskmaster guides behaviour, but cannot guarantee 100% LLM compliance)

---

## What Goes in `.ai-arch/`

```
.ai-arch/
├── 01_README.md                 ← What this folder is + TOGAF mapping
├── 02_PROJECT_CONTEXT.md        ← Why, who, what this project is NOT
├── 03_PRE_PROJECT_CHECKLIST.md  ← Business Case, NFRs, Data Classification, Risk Register
├── 04_ASSUMPTIONS.md            ← What must be true for the system to work
├── 05_COMPLEXITY_ANALYSIS.md    ← Effort estimate: traditional vs AI-augmented
├── 06_ARCHITECTURE_OVERVIEW.md  ← Mermaid layer diagram + prose (always mandatory)
├── 07_ARCHITECTURE_DECISIONS.md ← ADR log (append-only, never edited)
├── 08_AI_ASSISTANCE_MAP.md      ← Which files were AI-generated vs human-authored
├── AUDIT_SCORES.json            ← Structured audit history (appended after each audit)
└── diagrams/
    ├── CONTEXT.md               ← C1: system boundary + external actors
    ├── CONTAINERS.md            ← C2: deployable units + protocols
    ├── ERD.md                   ← mandatory if relational DB
    ├── DATAFLOW.md              ← mandatory if sensitive/sovereign data
    ├── DEPLOYMENT.md            ← mandatory if edge/hybrid/sovereign infra
    ├── SEQUENCE_[flow].md       ← per user flow, max 15 interactions
    └── STATE_[entity].md        ← per lifecycle entity
```

> `.ai-arch/` is gitignored by design. It is internal governance working documentation, not source code.

---

## ADR Rules

Architecture Decision Records are the core of the `adr` mode. Two rules that are never negotiated:

1. **Rejected alternatives are mandatory.** A decision without alternatives did not consider the trade-space. Minimum 2 per ADR.
2. **ADRs are never edited.** If a decision is reversed, write a new ADR that supersedes the old one.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).
