# Contributing

Contributions are welcome. This repository follows a strict quality standard for skills — the same standard enforced by the skills themselves.

## What to contribute

- **New skill modes** — extend the `governance`, `ai-compliance-framework`, or `vuln-scanner` skills with additional sub-specializations
- **Reference files** — add jurisdiction or sector references under `references/` (see structure below)
- **Bug fixes** — incorrect CWE/OWASP IDs, wrong TOGAF mappings, broken commands in vuln-scanner

## What not to contribute

- Project-specific conventions (those belong in your project's own `.ai-arch/` or `CLAUDE.md`)
- Skills for tools already well-documented elsewhere
- One-off scripts or templates with no reuse value

## Standards

### SKILL.md frontmatter

Every `SKILL.md` must follow the CSO (Claude Search Optimization) rules:

```yaml
---
name: skill-name-with-hyphens         # letters, numbers, hyphens only
description: >                         # max 1024 chars total
  Use when [specific triggering conditions].
  NOT a workflow summary — triggering conditions only.
  Written in third person.
---
```

The `description` field must:
- Start with `"Use when..."`
- Describe triggering conditions and symptoms, not the skill's process
- Be written in third person (it is injected into the system prompt)

### Honesty on classification

Every new mode or skill must declare its class:

| Class | Requirement |
|-------|-------------|
| **DETERMINISTIC** | Output is reproducible without AI. File checks, pattern matching only. |
| **GROUNDED** | Claims cite external sources with article/section references and confidence levels. |
| **MODEL-JUDGMENT** | Findings require interpretation. State this explicitly in output. |

A skill that mixes classes must label each finding or section with its class.

### CWE/OWASP citations

Any skill that produces security findings must cite CWE ID and OWASP 2021 category per finding. Findings without a citable mapping are downgraded to `INFO` — never fabricated.

### ADRs

Any significant change to skill logic (not just wording) warrants an ADR entry in `ARCHITECTURE_DECISIONS.md` if this repo has one.

## Adding reference files

The `references/` directory holds jurisdiction and sector documents used by `ai-compliance-framework`. Each file must start with a citation header:

```markdown
---
**Framework:** [Full name]
**Version:** [edition/year]
**Authority:** [publishing body]
**Status:** [In force / Draft / Phased]
**Enforcement dates:** [key milestones]
**Last verified:** [YYYY-MM-DD]
**Next review trigger:** [e.g., "EU AI Act Art. 6 enforcement Aug 2026"]
---
```

## Pull request process

1. Fork the repo
2. Make your changes in a branch: `feature/`, `fix/`, `docs/`, `refactor/`
3. Verify the skill frontmatter follows the standards above
4. Submit a PR with a clear description of what changed and why

## Disclaimer alignment

Any contribution to `ai-compliance-framework` must include the standard disclaimer:

> This skill provides AI-generated summaries of regulatory frameworks for developer guidance. It is not legal advice. Always verify requirements against official sources.

## Code of conduct

This project follows standard open-source norms. Keep discussion technical and constructive.
