# Human Resources — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Anti-discrimination, hiring transparency, right to human review, worker surveillance
> **Confidence:** HIGH — HR/employment AI is one of the most regulated AI use cases globally

## HR AI is High-Risk Almost Everywhere

| Jurisdiction | Classification | Reference |
| ------------- | --------------- | ----------- |
| EU | **High-Risk** (Annex III §4) | Recruitment, CV screening, performance evaluation, promotion/termination decisions |
| US (NYC) | **Regulated** | Local Law 144 — bias audits for automated employment decision tools (AEDTs) |
| US (Federal) | EEOC guidance | Title VII, ADA, ADEA apply to AI-assisted employment decisions |
| Singapore | AIGF applies | TAFEP (Tripartite Alliance for Fair Employment Practices) guidelines |
| Canada | Treasury Board Directive | AIA required for federal government HR AI |
| UK | Equality Act 2010 | Protected characteristics must not be adversely affected |

## Technical Directives

### HR-TD-001: Bias Audit for Hiring AI

**Requirement:** AI systems that screen, score, or rank job candidates must undergo annual bias audits.

**NYC Local Law 144 specifics (binding since July 2023):**

- Independent third-party bias audit required annually
- Audit must calculate selection rate and impact ratio for sex/gender and race/ethnicity categories
- Summary of results must be publicly posted on employer's website
- Candidates must be notified that AEDT is being used, at least 10 business days before use
- Candidates must be told what data is collected and its retention policy

**General implementation:**

1. Measure selection rates across protected categories (gender, race/ethnicity, age, disability)
2. Apply 4/5ths (80%) rule — if selection rate for any group is < 80% of the highest group, investigate
3. Document any business justification for disparate impact
4. Third-party audit (independent of development team)
5. Publish audit results (at minimum in jurisdictions that require it)

### HR-TD-002: Candidate Transparency

**Requirement:** Job candidates must be informed when AI influences hiring decisions.

**Implementation:**

1. Notification before AI assessment (not after)
2. Explain what the AI evaluates and what data it uses
3. Provide opt-out / request human-only review path
4. Disclose data retention policy for candidate information
5. Provide results or feedback from AI assessment on request (jurisdiction-dependent)

### HR-TD-003: Worker Surveillance AI

**Requirement:** AI-based employee monitoring must respect worker privacy and dignity.

**Key concerns:**

| Monitoring Type | Risk | Mitigation |
| ---------------- | ------ | ------------ |
| Keystroke/screen monitoring | Privacy, stress | Proportionality test; aggregate not individual; notify workers |
| Emotion recognition at work | EU AI Act prohibits in employment | Do not deploy in EU; caution elsewhere |
| Productivity scoring | Discrimination, bias | Fairness testing; human review of low scores |
| Video surveillance with AI | Privacy, biometrics | Data minimisation; no facial recognition without consent |
| Communication monitoring | Privacy, chilling effect | Legal basis required; notify workers; minimise scope |

### HR-TD-004: Performance Evaluation AI

**Requirement:** AI-assisted performance reviews must be transparent and contestable.

**Implementation:**

1. AI score is one input, not the sole determinant of performance rating
2. Employee can see and contest AI-generated performance data
3. Manager retains final decision authority
4. AI factors documented and explained to employees
5. Bias testing across protected categories annually

## Checklist

```text
[ ] AI hiring tools classified as high-risk (EU AI Act Annex III §4)
[ ] Annual bias audit conducted (NYC LL144 or equivalent methodology)
[ ] Selection rates measured across protected categories
[ ] Candidate notification implemented (before AI assessment)
[ ] Opt-out / human review path available for candidates
[ ] Worker surveillance proportionality assessed
[ ] Emotion recognition NOT used in employment context (EU prohibition)
[ ] Performance evaluation AI transparency documented
[ ] Employee contestability mechanism implemented
[ ] Data retention policy for candidate and employee AI data defined
```
