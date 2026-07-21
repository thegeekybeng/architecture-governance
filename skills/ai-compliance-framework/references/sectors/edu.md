# Education — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Student data protection, age-appropriate design, assessment fairness, academic integrity
> **Confidence:** HIGH for data protection intersection; MEDIUM for AI-specific education regulation (emerging)

## Key Education AI Concerns

| Use Case | Risk Level | Key Concern |
| ---------- | ----------- | ------------- |
| **AI-assisted grading/assessment** | HIGH | Fairness, bias across demographics, grade inflation/deflation |
| **Admissions screening** | HIGH | Discrimination, socioeconomic bias, EU AI Act Annex III |
| **Personalised learning paths** | MEDIUM | Filter bubbles, tracking, data retention |
| **Proctoring/exam monitoring** | HIGH | Privacy, facial recognition, disability discrimination |
| **AI tutoring/chatbots** | MEDIUM | Accuracy, age-appropriate content, dependency |
| **Plagiarism/AI-content detection** | MEDIUM | False positives disproportionately affecting non-native speakers |
| **Learning analytics** | MEDIUM | Profiling, data minimisation, parental consent |
| **Administrative automation** | LOW | Standard compliance requirements |

## Children's Data Protection

| Jurisdiction | Law | Age Threshold | Key Requirement |
| ------------- | ----- | --------------- | ----------------- |
| EU | GDPR Art. 8 + EU AI Act | 16 (or 13–16 per member state) | Parental consent for data processing; AI proctoring = high-risk |
| US | COPPA (Children's Online Privacy Protection Act) | 13 | Verifiable parental consent for under-13; no behavioural advertising |
| UK | Age Appropriate Design Code (Children's Code) | 18 | 15 standards for online services likely accessed by children |
| Singapore | PDPA + Advisory Guidelines on Children's Data | No statutory age threshold | Consent from parent/guardian for young persons |
| India | DPDP Act 2023 | 18 | Verifiable parental consent; no tracking/behavioural monitoring |
| Brazil | LGPD Art. 14 | 18 (best interest standard) | Processing in best interest of child; parental consent |

## Technical Directives

### EDU-TD-001: Assessment Fairness

**Requirement:** AI grading or scoring systems must demonstrate equitable outcomes across student demographics.

**Implementation:**

1. Measure score distributions across gender, ethnicity, socioeconomic status, disability status, native language
2. Disparate impact analysis (4/5ths rule or equivalent)
3. Bias testing before each academic cycle, not just at deployment
4. Appeal mechanism — students can request human re-grading
5. AI score must not be the sole determinant of academic outcomes

### EDU-TD-002: Student Data Minimisation

**Requirement:** Collect and process only the minimum student data necessary.

**Implementation:**

1. No biometric data collection from students without explicit parental consent AND demonstrated necessity
2. Learning analytics data anonymised or pseudonymised for research use
3. Student data retention limited to academic purpose + regulatory retention period
4. No sale or commercial use of student data (FERPA in US, similar provisions elsewhere)
5. Student data deleted upon graduation/withdrawal (or anonymised for longitudinal research with consent)

### EDU-TD-003: AI Content Appropriateness

**Requirement:** AI systems interacting with students must generate age-appropriate content.

**Implementation:**

1. Content filtering calibrated to student age group
2. No generation of violent, sexual, or harmful content
3. Factual accuracy requirements — AI must not teach incorrect information
4. Source attribution for AI-generated educational content
5. Teacher review/approval workflow for AI-generated curriculum materials

## Checklist

```text
[ ] Student age verification and consent management implemented
[ ] Parental consent mechanism for under-age students (per jurisdiction)
[ ] Assessment fairness testing completed across demographics
[ ] Student data minimisation reviewed
[ ] Data retention policy aligned with education records requirements
[ ] AI content filtering for age-appropriateness implemented
[ ] Appeal/human review mechanism available for AI-influenced academic decisions
[ ] FERPA compliance verified (US) or equivalent education data protection law
[ ] Teacher oversight mechanisms for AI-assisted instruction
```
