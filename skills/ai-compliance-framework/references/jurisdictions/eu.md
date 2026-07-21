# EU AI Act (Regulation 2024/1689)

> **Status:** Enforced — phased rollout Feb 2025 to Aug 2027
> **Binding:** YES — directly applicable regulation across all EU member states
> **Confidence:** HIGH — published in Official Journal of the EU, 12 July 2024
> **Source:** <https://eur-lex.europa.eu/eli/reg/2024/1689/oj>

## Key Dates

| Date | Milestone |
| ------ | ----------- |
| 1 Aug 2024 | Entry into force |
| 2 Feb 2025 | Prohibited AI practices (Art. 5) apply |
| 2 Aug 2025 | GPAI model obligations (Chapter V) apply; codes of practice due |
| 2 Aug 2026 | High-risk AI system obligations (Chapter III) apply; penalties enforceable |
| 2 Aug 2027 | Obligations for high-risk AI in Annex I (regulated products) apply |

## Risk Classification

### Unacceptable Risk (Art. 5) — PROHIBITED

- Social scoring by public authorities
- Real-time remote biometric identification in public spaces (with narrow exceptions)
- Emotion recognition in workplace/education settings
- AI exploiting vulnerabilities of specific groups (age, disability)
- Untargeted scraping of facial images from internet/CCTV for facial recognition databases
- Biometric categorisation based on sensitive attributes (race, political opinions, etc.)

### High-Risk (Art. 6 + Annex III) — HEAVY REGULATION

Category areas:

1. **Biometrics** — remote biometric identification, biometric categorisation, emotion recognition
2. **Critical infrastructure** — safety components in road/rail/air/water traffic, gas, electricity, water
3. **Education** — admissions decisions, assessment of learning outcomes, proctoring
4. **Employment** — recruitment, CV screening, performance evaluation, promotion/termination
5. **Essential services** — credit scoring, insurance pricing, social benefits eligibility
6. **Law enforcement** — individual risk assessments, polygraph/lie detection, evidence analysis
7. **Migration** — visa/asylum application assessment, border surveillance
8. **Justice/democracy** — legal research, judicial sentencing assistance

### Limited Risk (Art. 50) — TRANSPARENCY OBLIGATIONS

- Chatbots / conversational AI: Must disclose AI nature to users
- Deepfakes: Must label AI-generated content
- Emotion recognition / biometric categorisation: Must inform subjects
- AI-generated text published to inform public: Must label as AI-generated

### Minimal Risk — VOLUNTARY CODES OF CONDUCT

- Spam filters, AI-assisted development tools, video game AI, etc.

## Compliance Requirements by Dimension

### Dimension 1: Risk Classification & Registration

- **Art. 6:** Conduct risk classification assessment
- **Art. 49:** Register high-risk AI systems in EU database BEFORE placing on market
- **Art. 43:** Conformity assessment required (self-assessment or third-party depending on category)
- **Annex IV:** Technical documentation package required

### Dimension 2: Data Governance

- **Art. 10:** Training, validation, testing data must be:
  - Relevant, representative, free of errors, complete
  - Subject to appropriate data governance (collection, preparation, bias examination)
  - Statistically appropriate for intended purpose and geographic/contextual setting
- **Art. 10(5):** Special categories of personal data may be processed for bias monitoring only where strictly necessary

### Dimension 3: Transparency & Explainability

- **Art. 13:** High-risk AI must be designed for sufficient transparency to enable deployers to interpret outputs
- **Art. 50(1):** AI systems designed to interact with persons must notify them they are interacting with AI
- **Art. 50(2):** Emotion recognition/biometric categorisation must inform subjects
- **Art. 50(4):** AI-generated deepfake content must be labelled
- **Annex IV §2:** Technical documentation must include:
  - General description of the AI system
  - Detailed description of elements and development process
  - Monitoring, functioning, and control mechanisms
  - Information on intended purpose and foreseeable misuse

### Dimension 4: Human Oversight

- **Art. 14:** High-risk AI must:
  - Be designed for effective human oversight during use
  - Enable the human overseer to fully understand capabilities and limitations
  - Enable correct interpretation of high-risk AI output
  - Enable the human to decide not to use the system or override/reverse output
  - Enable intervention via a "stop" button or similar procedure

### Dimension 5: Fairness & Non-Discrimination

- **Art. 10(2)(f):** Examine training data for possible biases likely to affect health, safety, or fundamental rights
- **Art. 10(2)(g):** Identify relevant data gaps or shortcomings and how to address them
- **Art. 9(2)(a):** Risk management must identify and analyse known and foreseeable risks including to fundamental rights
- **Recital 47:** Bias detection and correction measures in training/validation data

### Dimension 6: Safety & Robustness

- **Art. 15:** Accuracy, robustness, and cybersecurity throughout lifecycle
- **Art. 15(3):** Resilience against attempts to manipulate training data (data poisoning) or model inputs (adversarial attacks)
- **Art. 15(4):** Redundancy solutions, including backup and fail-safe plans
- **Art. 9:** Risk management system throughout the AI system's lifecycle

### Dimension 7: Accountability & Governance

- **Art. 17:** Quality management system (documented policies, procedures, instructions)
- **Art. 12:** Automatic logging of events (audit trail) throughout the AI system's lifecycle
- **Art. 26:** Deployer obligations — monitor operation, report incidents, conduct DPIA, FRIA
- **Art. 27:** Fundamental Rights Impact Assessment (FRIA) required for high-risk AI by public bodies and regulated entities
- **Art. 73:** Serious incident reporting to market surveillance authorities within 15 days
- **Art. 72:** Fines up to €35M or 7% of global annual turnover

### Dimension 8: Privacy & Data Protection

- **Art. 10(5):** Processing of special categories limited to bias monitoring
- **Art. 26(9):** Deployers must conduct DPIA under GDPR Art. 35 where applicable
- **Recital 69:** Compliance with GDPR, LED (Law Enforcement Directive) required alongside AI Act
- GDPR obligations remain fully applicable — AI Act does not replace them

## Checklist for High-Risk AI Systems

```text
[ ] Risk classification completed (Art. 6)
[ ] Technical documentation prepared (Annex IV)
[ ] Quality management system established (Art. 17)
[ ] Data governance practices documented (Art. 10)
[ ] Automatic logging / audit trail implemented (Art. 12)
[ ] Transparency measures implemented (Art. 13)
[ ] Human oversight mechanisms designed (Art. 14)
[ ] Accuracy, robustness, cybersecurity validated (Art. 15)
[ ] Risk management system operational (Art. 9)
[ ] Conformity assessment completed (Art. 43)
[ ] EU declaration of conformity issued (Art. 47)
[ ] CE marking affixed (Art. 48)
[ ] Registration in EU database completed (Art. 49)
[ ] Fundamental Rights Impact Assessment conducted (Art. 27)
[ ] Post-market monitoring system in place (Art. 72)
[ ] Serious incident reporting procedure established (Art. 73)
```
