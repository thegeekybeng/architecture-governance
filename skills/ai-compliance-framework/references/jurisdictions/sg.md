# Singapore — Model AI Governance Framework (2nd Edition) + AI Verify + Agentic AI Framework

> **Status:** Active guidance (voluntary, but strongly encouraged by IMDA/PDPC)
> **Binding:** NO — soft law / guidance framework. However, PDPA (data protection) is binding.
> **Confidence:** HIGH — published by IMDA and PDPC
> **Sources:**
>
> - Model AIGF 2nd Ed (Jan 2020): <https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework>
>
> - AI Verify: <https://aiverifyfoundation.sg/>
> - Model AI Governance Framework for Agentic AI (Jan 22, 2026): Launched at WEF Davos 2026, published by IMDA

## IMDA Model AI Governance Framework for Agentic AI (2026)

> **Confidence:** HIGH — published framework, launched at WEF Davos, January 22, 2026
> **Significance:** First governance framework globally written specifically for autonomous AI agents

This framework addresses the unique governance challenges of **agentic AI systems** — AI that can autonomously plan, use tools, delegate to sub-agents, and take actions with real-world consequences. It is structured around four governance dimensions:

### Dimension 1: Risk Bounding

**Principle:** Agentic AI systems must operate within defined boundaries of acceptable risk.

**Requirements:**

- Define the operational envelope — what the agent is permitted to do, and what it is prohibited from doing
- Implement hard constraints (system-level, not prompt-level) that cannot be overridden by the agent
- Risk boundaries must be proportionate to the consequences of agent actions
- Agents with tool access (APIs, file systems, code execution) require stricter bounding than advisory agents
- Multi-agent systems must bound aggregate risk, not just individual agent risk

**Technical Directives:**

1. Action allowlists/denylists enforced at system level (not via prompt instructions alone)
2. Rate limiting and resource caps for agent actions
3. Escalation triggers when agent approaches boundary conditions
4. Sandbox environments for testing agent behaviour before production deployment
5. Kill switches / emergency stop mechanisms

### Dimension 2: Human Accountability

**Principle:** A human must be identifiable and accountable for the outcomes of agentic AI, even when the agent acts autonomously.

**Requirements:**

- Named human accountable for each agentic system (not "the AI team")
- Accountability chain documented from agent action → operator → deployer → developer
- Accountability cannot be delegated to the AI agent itself
- Human approval gates for consequential actions (financial transactions, data deletion, external communications)
- Post-hoc review mechanisms for autonomous decisions

**Key distinction from non-agentic AI:** In agentic systems, the gap between "human authorised the system" and "human authorised this specific action" is larger. The framework requires governance structures that bridge this gap.

### Dimension 3: Technical Controls

**Principle:** Agentic AI systems require technical safeguards that go beyond traditional AI governance.

**Requirements:**

- **Observability:** Full audit trail of agent reasoning, tool calls, and decisions
- **Determinism where possible:** Prefer deterministic workflows over unbounded agent autonomy for high-risk tasks
- **Memory and state management:** Agent memory/context must be auditable and purgeable
- **Tool call governance:** Every tool an agent can access must have documented permissions, rate limits, and failure modes
- **Sub-agent governance:** When an agent delegates to sub-agents, the delegating agent inherits accountability for sub-agent actions
- **Prompt injection defence:** System-level protections against prompt injection attacks that could cause agents to exceed boundaries

**Technical Directives:**

1. Structured logging of every agent step (thought → action → observation → result)
2. Tool permission matrices defining what each agent role can access
3. Sub-agent spawning controls (max depth, max concurrency, permission inheritance)
4. Input validation on all tool call parameters
5. Output filtering before agent results reach end users or external systems

### Dimension 4: End-User Responsibility

**Principle:** Users of agentic AI systems share responsibility for appropriate use.

**Requirements:**

- Clear disclosure to users that they are interacting with an agentic AI system
- User education on agent capabilities and limitations
- Users must understand what the agent can and cannot do autonomously
- Informed consent for agent actions that affect the user's data, finances, or rights
- Feedback mechanisms for users to flag problematic agent behaviour

### Agentic AI Governance Checklist

```text
[ ] Agentic system classified (advisory vs. tool-using vs. autonomous)
[ ] Risk boundaries defined and enforced at system level
[ ] Named human accountable for agent outcomes
[ ] Human approval gates defined for consequential actions
[ ] Full observability — agent reasoning and actions logged
[ ] Tool permission matrix documented
[ ] Sub-agent governance (delegation depth, permission inheritance)
[ ] Prompt injection defences implemented
[ ] Kill switch / emergency stop mechanism available
[ ] End-user disclosure of agentic AI interaction
[ ] End-user feedback mechanism for flagging issues
```

---

## PDPC Advisory Guidelines on the Use of Personal Data in Generative AI (July 20, 2026)

> **Confidence:** HIGH — published advisory guidelines by Singapore PDPC/IMDA, released July 20, 2026
> **Binding:** NO — advisory guidelines under the PDPA, but compliance informs PDPC's enforcement actions under the legally binding PDPA.

These guidelines clarify data protection responsibilities across the Generative AI (GenAI) supply chain, detail restrictions on web-scraping/data training, and define transparency expectations for organizations.

### 1. Stakeholder Roles & Responsibilities

Responsibilities under the PDPA are allocated depending on the organization's role in the AI lifecycle:

- **Model Providers:** Develop foundational GenAI models. Must implement model-level safeguards (e.g., dataset curation, safety fine-tuning), establish clear data retention policies (for training data), and document these safeguards to assist downstream users.
- **System Providers:** Build/integrate AI systems (e.g., software developers wrapping APIs or deploying models). Must review system-level security, prevent data leakage, and share configuration/safeguard best practices with downstream deployers.
- **System Deployers:** Deploy GenAI systems for internal use or end-users. **Bear the primary responsibility for PDPA compliance.** Must ensure personal data is collected/processed for defined, lawful purposes, set up appropriate filters (e.g., input/output sanitization), and review security arrangements periodically, particularly for Agentic AI deployments.

### 2. AI-Specific Notifications

When using personal data (which is not publicly available or subject to other exceptions) to train, fine-tune, or improve GenAI models, organizations must provide **AI-Specific Notifications**:

- **Transparency:** Clearly state what personal data is collected, the purpose of processing (e.g., "to improve response accuracy and train models"), and how individuals can exercise their rights.
- **Delivery:** Must be prominent and contextual (e.g., in-app pop-up, chatbot welcome message, chatbot info card).
- **Format:** Strongly encouraged to use standardized formats like **"Chatbot Info Cards"** (detailing chatbot capability, safety parameters, data usage, and user opt-out features).

### 3. Publicly Available Exception & Digital Barriers

Under the PDPA, organizations may collect and use publicly available personal data (e.g., web-scraping public sites) without consent for model training, subject to conditions:

- **Assessment of "Publicly Available":** Data is NOT considered publicly available if protected by "digital barriers" such as paywalls, user registration requirements, login prompts, or robots.txt restrictions.
- **Attribution & Respecting Controls:** Scraping must respect automated exclusion protocols (e.g., Robots Exclusion Protocol, robots.txt) and terms of service. If data is behind a paywall/login, explicit consent or standard data agreements are required.

### 4. Individual Rights (Access & Correction)

Individuals retain the right to request access to and correction of their personal data even after it is ingested into GenAI models:

- **Technical Challenges:** Acknowledging the difficulty of deleting/modifying personal data from pre-trained model weights, the guidelines require organizations to implement best practices to address requests on a case-by-case basis.
- **Mitigations:** Deployers/providers should use prompt-level filters, system override lists, or targeted model fine-tuning to prevent the model from outputting the user's incorrect or requested-to-be-deleted personal data.

### GenAI Data Governance Checklist

```text
[ ] Identified organization's role in the GenAI lifecycle (Model Provider vs. System Provider vs. System Deployer)
[ ] AI-Specific Notifications implemented for any model training/improvement using personal data
[ ] "Chatbot Info Card" or equivalent disclosure deployed for consumer-facing GenAI systems
[ ] Audited all scraped training data to ensure it complies with the "Publicly Available Exception" (no digital barriers bypassed, robots.txt respected)
[ ] Formulated procedures for handling user access/correction requests for data embedded in GenAI models
[ ] Input/output filtering implemented to prevent leakage of sensitive personal data
```

---

## Overview

Singapore's approach is principles-based and industry-led, not prescriptive legislation. The Model AI Governance Framework provides practical guidance organised around two guiding principles:

1. AI decisions should be **explainable, transparent, and fair**
2. AI systems should be **human-centric**

AI Verify is the world's first AI governance testing framework and toolkit (open-source), allowing organisations to demonstrate responsible AI through standardised testing.

## Four Key Areas

### 1. Internal Governance Structures and Measures

**Requirements:**

- Clear roles and responsibilities for AI governance (Board/C-suite accountability)
- Risk assessment framework with review cadence
- AI ethics committee or designated governance body
- Staff training and awareness on responsible AI
- Internal policies on AI development and deployment

**Checklist:**

```text
[ ] Designated AI governance owner at senior management level
[ ] AI governance policy documented and communicated
[ ] AI risk assessment framework with defined risk appetite
[ ] Regular review cadence (at least annually) for AI systems
[ ] Staff training programme on responsible AI
[ ] Incident escalation and response procedures
```

### 2. Determining AI Decision-Making Model

**Levels of human involvement:**

| Level | Description | When to use |
| ------- | ------------- | ------------- |
| **Human-in-the-loop** | Human makes final decision, AI assists | High-risk decisions (credit, medical, legal) |
| **Human-on-the-loop** | AI decides, human monitors and can intervene | Medium-risk, time-sensitive decisions |
| **Human-out-of-the-loop** | Fully autonomous AI | Low-risk, high-volume decisions (spam filtering) |

**Requirements:**

- Classify each AI use case by risk to individuals
- Higher risk → more human involvement
- Document the rationale for chosen level of autonomy
- Define escalation triggers for autonomous systems

**Checklist:**

```text
[ ] AI use cases classified by risk level
[ ] Human involvement level determined per use case
[ ] Escalation triggers defined for autonomous decisions
[ ] Override/intervention mechanism available for high-risk cases
[ ] Risk classification rationale documented
```

### 3. Operations Management

**Requirements:**

- Data management practices (quality, provenance, consent)
- Model training methodology documentation
- Model validation and testing (bias testing, accuracy metrics)
- Monitoring and alerting for model drift/degradation
- Version control for models and training data
- Incident management process

**Checklist:**

```text
[ ] Data provenance and lineage tracked
[ ] Data quality assessments performed
[ ] Consent and lawful basis documented for personal data
[ ] Model validation includes fairness/bias testing
[ ] Performance metrics defined and monitored
[ ] Model drift detection and alerting in place
[ ] Model versioning and rollback capability
[ ] Incident response process for AI failures
```

### 4. Stakeholder Interaction and Communication

**Requirements:**

- Clear communication to users about AI's role in decisions
- Disclosure when AI is used to make or assist decisions affecting individuals
- Accessible explanations of how AI influences outcomes
- Feedback mechanism for individuals affected by AI decisions
- Channels for redress when AI decisions are contested

**Checklist:**

```text
[ ] Users informed when interacting with or affected by AI
[ ] Explanation of AI's role in decisions provided
[ ] Feedback/complaint mechanism available
[ ] Redress process documented for contested AI decisions
[ ] Communication tailored to audience (technical vs. lay)
```

## AI Verify Testing Framework

AI Verify provides standardised tests across 11 pillars (mapped to the Model AI Governance Framework):

| Pillar | Test Areas |
| -------- | ----------- |
| Transparency | Process documentation, communication to stakeholders |
| Explainability | Feature importance, decision explanations |
| Repeatability/Reproducibility | Consistent outputs, deterministic behaviour |
| Safety | Error handling, edge cases, fallback mechanisms |
| Security | Adversarial robustness, data protection |
| Robustness | Performance under distribution shift, noise handling |
| Fairness | Bias metrics across protected attributes |
| Data Governance | Quality, provenance, consent |
| Accountability | Audit trails, governance structures |
| Human Agency & Oversight | Override mechanisms, human involvement |
| Inclusive Growth | Accessibility, societal benefit |

**Checklist (AI Verify):**

```text
[ ] AI Verify self-assessment completed
[ ] Testing toolkit run against AI system
[ ] Results documented in AI Verify report format
[ ] Gaps identified and remediation planned
```

## PDPA Integration (Binding)

> **Status:** Binding law — Personal Data Protection Act 2012 (amended 2020)

The PDPA is Singapore's data protection law and intersects with AI governance:

- **Consent Obligation:** Obtain consent before collecting, using, or disclosing personal data
- **Purpose Limitation:** Use personal data only for purposes the individual was informed of
- **Notification Obligation:** Inform individuals of purposes for data collection
- **Access and Correction:** Individuals can request access to and correction of their personal data
- **Data Breach Notification:** Mandatory notification to PDPC within 3 calendar days for significant breaches
- **Do Not Call Registry:** Compliance for marketing use cases
- **Mandatory breach notification:** Since 1 Feb 2021, organisations must notify PDPC of significant data breaches

**Penalties:** Up to S$1 million fine per breach (increased from S$100,000 in 2020 amendments)

## MAS FEAT Principles (Financial Sector — see also sectors/fin.md)

For financial institutions, the Monetary Authority of Singapore published **FEAT** (Fairness, Ethics, Accountability, Transparency) principles:

- **Fairness:** AI-driven decisions should not disadvantage individuals or groups based on personal attributes
- **Ethics:** AI should be used in an ethical manner aligned with organisational values
- **Accountability:** Clear ownership, governance, and auditability of AI systems
- **Transparency:** Use of AI should be disclosed to individuals affected
