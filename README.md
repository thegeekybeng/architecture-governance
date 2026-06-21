# architecture-governance

**Architectural governance skills for AI agents**

TOGAF-mapped documentation · Deterministic compliance verification · CWE/OWASP-cited code audits

`skills 4` · `modes 11` · `agents Antigravity · Codex · Gemini CLI · Claude Code` · `license MIT`

> **Note:** The "11 modes" total includes 9 explicitly documented in the tables below for `governance` and `ai-compliance-framework`, plus 1 mode each for the single-purpose `vuln-scanner` and `taskmaster` skills.

This bundle is distributed as SKILL.md Agent Skills and runs on any agent that supports the format, including Claude Code. Verified working with the agents listed below.

## The Problem

Most AI-augmented projects start with code. Architecture decisions get made implicitly, never recorded. Security findings have no consistent severity language. There is no way to tell, weeks later, whether governance was applied or just assumed.

This skill bundle enforces the gate before the first line of code, verifies it deterministically, and gives every audit a comparable score.

## Why This Matters

AI-generated code introduces unique risks that traditional tooling struggles to catch. This framework grounds your AI operations in recognized, industry-standard practices:

- **Architecture Governance:** Mapped to TOGAF ADM to ensure decisions are deliberate and traceable.
- **AI Risk Management:** Aligns with the NIST AI RMF, EU AI Act, and Singapore's Model AI Governance Framework for transparent, accountable AI behaviour.
- **Security & Quality:** Findings are cited directly against the OWASP Top 10:2025 and CWE taxonomy to avoid vague "code smell" feedback.
- **Sector Compliance:** Supports specialized standards like MAS FEAT (Finance) and IEC 61511/61508 (Oil & Gas / functional safety) to prevent regulatory blind spots.

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

**Verified working:** tested with Antigravity CLI, Codex, Gemini CLI. The installer clones from GitHub, detects 4 skills, and maps them to the target agent automatically.

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

> **Note:** the `ai-compliance-framework` skill installs under the name `governance-encoded` (its internal skill name). Use that name with `remove`.

---

## `governance` — Master lifecycle skill

Six modes, one skill. Dispatch by trigger phrase. (Bundle totals 11 modes across 4 skills: 6 in `governance`, 3 in `ai-compliance-framework`, 1 in `vuln-scanner`, and 1 in `taskmaster`.)

| Mode | Trigger | Output |
| ------ | --------- | -------- |
| `scaffold` | "set up the project", "init .ai-arch/" | `.ai-arch/` with 10 TOGAF-mapped files |
| `adr` | "write an ADR", any tech choice | Appended ADR with mandatory rejected alternatives |
| `verify` | "verify compliance", "check governance" | Gate report — `--fast` (DETERMINISTIC, default) or `--deep` (MODEL-JUDGMENT) |
| `diagram` | "draw ERD", "draw context diagram", etc. | HTML chart with PNG export in `.ai-arch/charts/` |
| `audit` | "audit this", "audit [path]" | 6-pillar report with weighted score |
| `sanitize` | "sanitize PII", "obfuscate network" | Scrubbed text/code output replacing sensitive data |

### `verify` mode — example output

```
# Compliance Verification Report

Repo: ./my-project   Date: 2026-06-18   Mode: --fast

## Gate Results

| Gate                      | Status      | Detail
|---------------------------|-------------|------------------------------------------
| .ai-arch/ presence        | ✅ PASS     | 10/10 files present
| ADR quality               | ⚠️ PARTIAL  | 2 of 4 ADRs missing rejected alternatives
| Data classification       | ✅ PASS     | dataflow.html and erd.html present
| AI governance             | ❌ FAIL     | AI component found; no governance framework
| NFR completeness          | ✅ PASS     | Performance, Security, Retention configured

Score: 3.5/5   Status: PARTIALLY COMPLIANT
```

Gate scoring: PASS = 1.0 · PARTIAL = 0.5 · FAIL = 0.0, averaged across gates.

**AI Component Governance:** If an AI component is detected (e.g., Ollama, Langchain), the framework strictly enforces the presence of a documented governance strategy covering **six minimum controls**: anti-hallucination rules, prompt injection defence (structural fencing), context window bounding, phantom commitment prevention, mandatory audit logging, and a loop-breaking protocol.

### `audit` mode — scoring formula (fixed, v1.0)

Audits are **comparable over time** because the formula never changes.

Every security finding cites a CWE ID and an OWASP Top 10:2025 category. No citation = downgraded to `INFO`.

Example scorecard (scores displayed are post-deduction, starting from a base of 10):

| Pillar | Weight | Score | CRITICAL | HIGH | MEDIUM | LOW |
| -------- | -------- | ------- | ---------- | ------ | -------- | ----- |
| Security | 25% | 6.3/10 | 0 | 1 | 3 | 2 |
| Tech Debt | 20% | 7.4/10 | 0 | 0 | 4 | 6 |
| Deployability | 15% | 8.9/10 | 0 | 0 | 2 | 1 |
| Privacy | 15% | 9.5/10 | 0 | 0 | 1 | 0 |
| Observability | 15% | 9.4/10 | 0 | 0 | 1 | 1 |
| Scalability | 10% | 8.7/10 | 0 | 0 | 2 | 3 |
| **Weighted** | **100%** | **8.10/10** | 0 | 1 | 13 | 13 |

```
Pillar weights:  Security 25% · Tech Debt 20% · Deployability 15% · Privacy 15% · Observability 15% · Scalability 10%   (Σ = 100%)
Deductions:      CRITICAL −3.0 · HIGH −2.0 · MEDIUM −0.5 · LOW −0.1   (pillar score floored at 0.0)
Weighted overall: Σ (pillar_score × weight)
```

Audit history is stored in `.ai-arch/AUDIT_SCORES.json` — structured JSON so every future session can compute the trend without parsing markdown.

### `scaffold` mode — TOGAF ADM mapping

The 10 files created map directly to TOGAF ADM Phase Preliminary + Phase A deliverables:

| File | TOGAF Phase | Deliverable |
| ------ | ------------- | ------------- |
| `01_README.md` | Preliminary | Architecture Repository orientation + TOGAF mapping |
| `02_PROJECT_CONTEXT.md` | Phase A | Statement of Architecture Work |
| `03_PRE_PROJECT_CHECKLIST.md` | Preliminary | Architecture Principles + Capability Assessment |
| `04_ASSUMPTIONS.md` | Phase A | Architecture Vision — assumptions & constraints |
| `05_COMPLEXITY_ANALYSIS.md` | Phase A | Architecture Vision — feasibility & effort |
| `06_ARCHITECTURE_OVERVIEW.md` | Phase A | Architecture Vision (HTML layer diagram) |
| `07_ARCHITECTURE_DECISIONS.md` | A–D | Architecture Decision Log (append-only) |
| `08_AI_ASSISTANCE_MAP.md` | B–D | Architecture Definition Document — provenance |
| `09_API_REFERENCE.md` | Phase C | Architecture Definition Document — interfaces |
| `10_OBSERVABILITY_STRATEGY.md` | F–G | Migration Planning / Implementation Governance |
| `charts/` | B–D | Domain views |

Source: TOGAF® Standard, 10th Edition (Open Group, 2022).

---

## `ai-compliance-framework` — Regulatory mapping

Three modes. Covers 14 frameworks and jurisdictions across 9 sectors.

| Mode | Trigger | Output |
| ------ | --------- | -------- |
| `map` | "AI compliance check", "compliance mapping" | Technical Directive Cards per governance dimension |
| `compare` | "compare frameworks", "LangGraph vs CrewAI" | Compliance matrix across agent architectures |
| `handoff` | "policy handoff", "multi-national compliance" | Jurisdiction-switching protocol + conflict matrix |

**Frameworks & jurisdictions (14):** EU AI Act · Singapore (Model AI Governance Framework + Model AI Governance Framework for Agentic AI, 2026) · NIST AI RMF · UK · China · Australia · Japan · South Korea · Canada · India · Brazil · ASEAN · ISO 42001 · OECD

> Note: ISO 42001 is an international management-system standard and OECD provides intergovernmental principles; both are governance references rather than national jurisdictions, and are included in the count of 14.

**Sectors (9):** Government · Healthcare · Finance (MAS FEAT) · Critical Infrastructure · Oil & Gas (IEC 61511/61508) · Education · HR · Law Enforcement · General / Cross-sector

Every requirement cites a specific article, principle, or section with confidence levels (HIGH / MEDIUM / LOW). Mandatory vs. voluntary is always distinguished.

> **Disclaimer:** This skill provides developer guidance, not legal advice. Verify requirements against official sources before making compliance decisions.

---

## `vuln-scanner` — External vulnerability scanning (DAST)

Orchestrates Nuclei + nmap + httpx for live target assessment. Requires explicit legal acknowledgment before any scan executes.

**Mandatory Safety Requirements:**

- **Written Authorization:** You must have explicit, written permission from the target owner before scanning.
- **No Public Targets:** Do not scan public websites or third-party infrastructure without prior authorization.
- **Rate Limiting:** Scans must be throttled to avoid denial-of-service (DoS) conditions on the target.
- **Scope Logging:** All scanned targets and executed profiles must be logged for auditability.

**Mandatory tools:** `nuclei`, `nmap`, `httpx` (install instructions built into the skill). Docker alternatives provided.

**Not for:** source code analysis (use a SAST tool), dependency auditing, or targets you do not own.

---

## `taskmaster` — Strict Execution Protocol

Enforces rigid AI behavioural rules: no conversational filler, mandatory up-front alternative considerations, and research-first resolution pathways.

**Features:**

- Kills open-ended conversational questions ("What's next?").
- Limits clarifying questions to max 3, strictly at the beginning of a task.
- Forces the agent to cite sources and provide confidence scoring (HIGH / MEDIUM / LOW).
- Ensures alternative solutions are proposed before implementation, not as an afterthought.

---

## Skill Classification

This bundle is honest about what each mode can and cannot guarantee:

| Mode | Class | What it means |
| ------ | ------- | --------------- |
| `verify` | DETERMINISTIC | File existence + pattern checks. Same input → same output. AI-free findings. |
| `adr` | DETERMINISTIC | Format enforcement. Structural rules, not interpretation. |
| `scaffold` | GROUNDED | TOGAF-cited structure. Every file maps to a published deliverable. |
| `ai-compliance-framework` | GROUNDED | Regulatory articles cited with confidence levels and source dates. |
| `audit` | MODEL-JUDGMENT + GROUNDED | Findings need interpretation; CWE/OWASP citations are grounded. |
| `diagram` | MODEL-JUDGMENT | Content quality assessed by model; mandatory conditions are rule-enforced. |
| `sanitize` | MODEL-JUDGMENT | Contextual redaction via model; reduces exposure but requires human verification. |
| `vuln-scanner` | GROUNDED | Tool-generated findings; model interprets, not originates. |
| `taskmaster` | DETERMINISTIC | Behavioural rules enforced structurally, not interpreted. |

**What this bundle does NOT do:**

- Replace a qualified security auditor for production systems
- Guarantee complete PII or sensitive-data removal (`sanitize` mode reduces exposure, but output MUST be human-verified before sensitive data leaves a trusted boundary)
- Provide legally binding compliance advice
- Check semantic correctness of governance document content (`--fast` mode)
- Guarantee completeness of regulatory coverage
- Constrain agent behaviour perfectly (`taskmaster` guides behaviour, but cannot guarantee 100% LLM compliance)

---

## What Goes in `.ai-arch/`

```
.ai-arch/
├── 01_README.md              ← What this folder is + TOGAF mapping
├── 02_PROJECT_CONTEXT.md     ← Why, who, what this project is NOT
├── 03_PRE_PROJECT_CHECKLIST.md  ← Business Case, NFRs, Data Classification, Risk
├── 04_ASSUMPTIONS.md         ← What must be true for the system to work
├── 05_COMPLEXITY_ANALYSIS.md ← Effort estimate: traditional vs AI-augmented
├── 06_ARCHITECTURE_OVERVIEW.md  ← HTML layer diagram + prose (always mandatory)
├── 07_ARCHITECTURE_DECISIONS.md ← ADR log (append-only, never edited)
├── 08_AI_ASSISTANCE_MAP.md   ← Which files were AI-generated vs human-authored
├── 09_API_REFERENCE.md       ← API contracts and definitions
├── 10_OBSERVABILITY_STRATEGY.md ← L.M.T.A (Logs, Metrics, Traces, Alerts) framework
├── AUDIT_SCORES.json         ← Structured audit history (appended after each audit)
└── charts/
    ├── context.html          ← C1: system boundary + external actors
    ├── containers.html       ← C2: deployable units + protocols
    ├── erd.html              ← mandatory if relational DB
    ├── dataflow.html         ← mandatory if sensitive/sovereign data
    ├── deployment.html       ← mandatory if edge/hybrid/sovereign infra
    ├── sequence_[flow].html  ← per user flow, max 15 interactions
    └── state_[entity].html   ← per lifecycle entity
```

> `.ai-arch/` is gitignored by design. It is internal governance working documentation, not source code. **Note:** Because it is gitignored, `AUDIT_SCORES.json` only persists in your local environment. To share audit history across a team, you must explicitly commit it or export it to a persistent metrics store.

## ADR Rules

Architecture Decision Records are the core of the `adr` mode. Two rules that are never negotiated:

1. **Rejected alternatives are mandatory.** A decision without alternatives did not consider the trade-space. Minimum 2 per ADR.
2. **ADRs are never edited.** If a decision is reversed, write a new ADR that supersedes the old one.

---

## Sources & Frameworks

This bundle references and implements principles from the following official sources:

- **TOGAF® Standard, 10th Edition:** <https://www.opengroup.org/togaf>
- **OWASP Top 10:2025:** <https://owasp.org/Top10/2025/>
- **NIST AI Risk Management Framework (AI RMF 1.0):** <https://www.nist.gov/itl/ai-risk-management-framework>
- **EU AI Act:** <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689>
- **Singapore Model AI Governance Framework:** <https://www.pdpc.gov.sg/Help-and-Resources/2020/01/Model-AI-Governance-Framework>
- **Singapore Model AI Governance Framework for Agentic AI (IMDA, 2026):** <https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai>
- **MAS FEAT Principles:** <https://www.mas.gov.sg/publications/monographs-or-information-paper/2018/feat>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
