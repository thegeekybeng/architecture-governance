# United States — NIST AI Risk Management Framework (AI RMF 1.0)

> **Status:** Voluntary guidance — NIST AI RMF 1.0 active; EO 14110 rescinded Jan 2025
> **Binding:** NIST AI RMF is voluntary; no binding federal AI mandate currently in effect
> **Confidence:** HIGH — NIST AI RMF published January 2023; EO rescission verified
> **Source:** <https://airc.nist.gov/AI_RMF_Interactivity/ai-rmf>
> **Note:** EO 14110 was rescinded in January 2025. State-level AI legislation is active and evolving (see below).

## NIST AI RMF 1.0 Structure

The framework is organised around four core **functions**, each containing **categories** and **subcategories**:

### GOVERN — Establish AI Risk Management Culture

Cultivate and implement a culture of risk management within organisations.

| Category | Key Requirements |
| ---------- | ----------------- |
| GOVERN 1 | Policies, processes, procedures, and practices are in place and documented |
| GOVERN 2 | Accountability structures are in place (roles, responsibilities, authority) |
| GOVERN 3 | Workforce diversity, equity, inclusion, and accessibility processes integrated |
| GOVERN 4 | Organisational teams are committed to culture of risk management |
| GOVERN 5 | Processes in place for cross-functional, interdisciplinary AI risk management |
| GOVERN 6 | Policies and procedures address AI risks from third-party entities |

**Checklist:**

```text
[ ] AI risk management policy documented
[ ] Roles and responsibilities for AI governance defined
[ ] DEIA considerations integrated into AI lifecycle
[ ] Third-party AI risk management procedures in place
[ ] Cross-functional AI governance team established
[ ] Regular risk reviews scheduled
```

### MAP — Identify and Contextualise AI Risks

Understand the AI system's context, capabilities, and potential impacts.

| Category | Key Requirements |
| ---------- | ----------------- |
| MAP 1 | Intended purposes, context of use, and known limitations documented |
| MAP 2 | Interdisciplinary expertise and consultation during system design |
| MAP 3 | AI capabilities, targeted uses, goals, and expected benefits documented |
| MAP 4 | Risks and benefits mapped for all components of the AI system |
| MAP 5 | Impacts to individuals, groups, communities, organisations, and society assessed |

**Checklist:**

```text
[ ] Intended use and context documented
[ ] Known limitations and failure modes identified
[ ] Impact assessment on affected populations completed
[ ] Benefits and risks mapped across stakeholders
[ ] Domain expertise consulted in system design
```

### MEASURE — Assess, Analyse, and Track AI Risks

Quantify and monitor identified risks.

| Category | Key Requirements |
| ---------- | ----------------- |
| MEASURE 1 | Appropriate methods and metrics identified for risk measurement |
| MEASURE 2 | AI systems evaluated for trustworthy characteristics (valid, reliable, safe, secure, fair, transparent, explainable, privacy-enhanced, accountable) |
| MEASURE 3 | Mechanisms for tracking identified AI risks over time |
| MEASURE 4 | Feedback about efficacy of measurement collected |

**Checklist:**

```text
[ ] Performance metrics defined (accuracy, precision, recall, F1, etc.)
[ ] Fairness metrics defined and measured across demographic groups
[ ] Safety testing completed (edge cases, failure modes)
[ ] Security assessment performed (adversarial robustness)
[ ] Monitoring dashboard / alerting for model performance
[ ] Regular re-evaluation schedule established
```

### MANAGE — Prioritise and Act on AI Risks

Allocate resources and take actions to address identified risks.

| Category | Key Requirements |
| ---------- | ----------------- |
| MANAGE 1 | AI risks based on assessments are prioritised, responded to, and managed |
| MANAGE 2 | Strategies to maximise AI benefits and minimise negative impacts |
| MANAGE 3 | AI risks and benefits from third-party resources are managed |
| MANAGE 4 | Risk treatments including response, recovery, and communication documented |

**Checklist:**

```text
[ ] Risk prioritisation matrix created
[ ] Mitigation strategies documented per identified risk
[ ] Incident response plan for AI failures
[ ] Third-party AI provider risk assessments completed
[ ] Communication plan for stakeholders if AI incidents occur
[ ] Decommissioning / sunset procedures defined
```

## NIST AI RMF Trustworthy AI Characteristics

The 7 characteristics that must be measured (MEASURE function):

| Characteristic | Assessment Criteria |
| --------------- | ------------------- |
| **Valid & Reliable** | Deployed performance matches test performance; reliable across conditions |
| **Safe** | Does not endanger human life, health, property, or environment |
| **Secure & Resilient** | Resistant to adversarial manipulation; maintains function under stress |
| **Accountable & Transparent** | Audit trail; stakeholders can understand risk management practices |
| **Explainable & Interpretable** | Mechanisms for understanding why AI produced specific outputs |
| **Privacy-Enhanced** | Compliant with data protection norms; data minimisation; consent |
| **Fair — with Harmful Bias Managed** | Systematic and computational biases detected, evaluated, mitigated |

## Executive Order 14110 (Oct 2023) — RESCINDED Jan 2025

> **⚠️ RESCINDED:** EO 14110 was rescinded by Executive Order in January 2025. The requirements below are no longer enforceable. Retained for historical reference and in case successor orders re-establish similar mandates.

Key requirements (when enforceable — **currently not in effect**):

- Dual-use foundation models: Safety testing and reporting to government
- Red-teaming requirements for high-impact AI systems
- AI-generated content watermarking and authentication
- Federal agencies must designate Chief AI Officers
- Federal agencies must complete AI use case inventories
- OMB guidance on federal AI procurement and use

## State-Level AI Legislation

Several US states have enacted or are considering AI-specific legislation:

| State | Legislation | Focus |
| ------- | ----------- | ------- |
| Colorado | SB 24-205 (2024) | High-risk AI decision-making; bias auditing and disclosure |
| Illinois | AI Video Interview Act | Consent for AI analysis of video interviews |
| New York City | Local Law 144 (2021) | Bias audits for automated employment decision tools |
| California | AB 2013, SB 942 | AI transparency, GenAI watermarking |
| Texas | HB 149 | AI use in government; transparency requirements |
| Various | Draft bills | Deepfake regulation, AI in education, AI in healthcare |

> **Confidence:** MEDIUM — state legislation is rapidly evolving. Verify current status before relying on specific state laws.
