# Government / Public Sector — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Algorithmic accountability, citizen rights, transparency mandates, democratic oversight
> **Confidence:** HIGH — government AI requirements are well-documented across jurisdictions

## Universal Government AI Principles

Regardless of jurisdiction, government AI systems face heightened requirements in:

1. **Transparency** — Citizens have a right to know when AI influences government decisions affecting them
2. **Accountability** — A named human official must be accountable for every AI-assisted decision
3. **Non-discrimination** — Government AI must not discriminate based on protected characteristics
4. **Due process** — Citizens must have a right to challenge AI-influenced government decisions
5. **Democratic oversight** — Elected representatives must have oversight of government AI systems

## Technical Directives

### GOV-TD-001: Algorithmic Impact Assessment (AIA)

**Requirement:** Before deploying any AI system in government service delivery, conduct a formal algorithmic impact assessment.

**Implementation:**

1. Document the AI system's purpose, scope, and intended beneficiaries
2. Identify all demographic groups affected by the system
3. Assess potential disparate impacts across protected groups
4. Document mitigation measures for identified impacts
5. Publish AIA summary (or full report, per jurisdiction) publicly
6. Review AIA annually or when system changes significantly

**Evidence:** Written AIA document, public summary, review log

### GOV-TD-002: Citizen Notification

**Requirement:** Inform citizens when AI is used in decisions that affect their rights, benefits, or services.

**Implementation:**

1. Display clear, plain-language AI disclosure in all user-facing interfaces
2. Notification must be given BEFORE the AI-influenced decision, not after
3. Explain what the AI does, what data it uses, and how it influences the decision
4. Provide contact information for human review requests
5. Notification must be accessible (WCAG 2.1 AA minimum)

**Code Pattern:**

```typescript
// Citizen AI disclosure component
interface AIDisclosure {
  systemName: string;
  purpose: string;           // Plain language
  dataUsed: string[];        // List of data categories
  humanReviewContact: string; // Email or form URL
  decisionWeight: 'advisory' | 'determinative'; // How much AI influences decision
}
```

### GOV-TD-003: Human Accountability Chain

**Requirement:** Every AI-assisted government decision must have a named human official accountable for it.

**Implementation:**

1. Store `accountable_officer_id` with every AI-generated decision record
2. The accountable officer must have authority to override the AI
3. Override/acceptance actions must be logged with timestamp
4. No AI system may issue a final government decision without human sign-off (for rights-affecting decisions)

### GOV-TD-004: Audit Trail Retention

**Requirement:** Government AI decision logs must be retained per records management requirements.

**Retention guidance:**

| Jurisdiction | Retention Period |
| ------------- | ----------------- |
| Singapore | 5 years (Public Records Act) — verify with NAS |
| EU | Varies by member state; typically 5-10 years for administrative decisions |
| US | Per NARA records schedule; typically 6-10 years for case files |
| UK | Per The National Archives guidance; typically 7 years |

### GOV-TD-005: Procurement and Third-Party AI

**Requirement:** Government procurement of AI systems must include compliance requirements in contracts.

**Contract clauses to include:**

- Right to audit AI system (source code, training data, performance metrics)
- Bias testing obligations on vendor
- Incident notification requirements
- Data sovereignty and residency requirements
- Model documentation and explainability requirements
- Exit/portability rights if vendor relationship ends

## Jurisdiction-Specific Government Requirements

### Singapore — Smart Nation Initiative

- AI Governance Body: Smart Nation and Digital Government Office (SNDGO)
- AI Ethics Advisory Board established under IMDA
- Government AI projects follow Model AIGF as baseline
- GovTech provides central AI platform services

### EU — Public Sector AI

- EU AI Act Art. 27: FRIA mandatory for high-risk AI by public bodies
- EU AI Act Art. 26(8): Public deployers must register high-risk AI in EU database
- eGovernment Benchmark includes AI transparency metrics
- GDPR Art. 22: Automated individual decision-making restrictions

### US — Federal AI

- OMB M-24-10: Governance requirements for federal AI use
- Federal AI use case inventory (public)
- Chief AI Officer designation in each agency
- AI Bill of Rights (White House OSTP, 2022) — non-binding principles
