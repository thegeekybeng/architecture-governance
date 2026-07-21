# Law Enforcement — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Biometric restrictions, proportionality, fundamental rights, due process
> **Confidence:** HIGH — law enforcement AI is the most heavily regulated AI category globally

## Law Enforcement AI is the Highest Scrutiny Category

EU AI Act treats law enforcement AI as high-risk (Annex III §6, §7) with some uses outright **prohibited** (Art. 5).

## Prohibited Uses (EU AI Act Art. 5)

| Use | Status | Exception |
| ----- | -------- | ----------- |
| Real-time remote biometric identification in public spaces | **BANNED** | Narrow exceptions: search for missing children, prevent imminent terror threat, locate suspects of serious crimes (requires judicial authorisation) |
| Untargeted scraping of facial images for facial recognition databases | **BANNED** | No exceptions |
| Emotion recognition in law enforcement | **BANNED** | No exceptions |
| Social scoring by public authorities | **BANNED** | No exceptions |
| Predictive policing based solely on profiling | **BANNED** | No exceptions for individual-level prediction based on personal characteristics |

## High-Risk Uses (EU AI Act Annex III §6, §7)

| Use Case | Risk Level | Key Requirement |
| ---------- | ----------- | ----------------- |
| Individual risk assessment (recidivism) | HIGH | Fundamental Rights Impact Assessment, human oversight, bias testing |
| Polygraph / lie detection AI | HIGH | Not to be sole basis for decision; human review required |
| Evidence evaluation / forensic analysis | HIGH | Transparency, documentation, expert review |
| Crime analytics / hotspot prediction | HIGH | Area-based only (not individual); proportionality |
| Border surveillance / migration control | HIGH | Fundamental rights assessment, non-discrimination |
| Document authentication / fraud detection | HIGH | Accuracy validation, false positive management |

## Technical Directives

### LEA-TD-001: Fundamental Rights Impact Assessment (FRIA)

**Requirement:** Mandatory before deploying any AI in law enforcement (EU AI Act Art. 27 for public bodies).

**Implementation:**

1. Identify all fundamental rights potentially affected (liberty, privacy, non-discrimination, presumption of innocence, right to fair trial)
2. Assess proportionality — is AI necessary? Is there a less intrusive alternative?
3. Assess discriminatory impact across racial, ethnic, gender, religious, and socioeconomic groups
4. Define safeguards and mitigation measures
5. Consult relevant oversight bodies (data protection authority, human rights commission)
6. Publish FRIA summary (or provide to oversight body)

### LEA-TD-002: Facial Recognition Governance

**Requirement:** Where facial recognition is permitted, strict governance requirements apply.

**Implementation:**

1. Legal basis documented (statutory authority, judicial authorisation)
2. Proportionality test passed — serious enough crime to justify biometric surveillance
3. Accuracy validation across demographics (NIST FRVT results or equivalent)
4. False positive management — human review of ALL matches before action
5. Data retention limited to investigation duration
6. Subject notification after investigation concludes (where legally permitted)
7. Audit trail of every search with justification

### LEA-TD-003: Predictive Policing Constraints

**Requirement:** AI crime prediction must not target individuals based on personal characteristics.

**Implementation:**

1. Area-based prediction only (hotspot mapping) — NOT individual risk scoring
2. No profiling based on race, ethnicity, religion, nationality, immigration status
3. Predictions are intelligence leads, not evidence — cannot be sole basis for stops, searches, or arrests
4. Regular bias audits of prediction outputs vs. actual crime data
5. Community oversight mechanisms
6. Sunset clauses — regular reassessment of whether the tool is still proportionate

### LEA-TD-004: Evidence Chain Integrity

**Requirement:** AI-processed evidence must maintain admissibility standards.

**Implementation:**

1. Chain of custody documented for AI-processed digital evidence
2. AI methodology documented and available for defence review (Daubert/Frye standard in US)
3. AI limitations disclosed to court (false positive/negative rates, training data provenance)
4. Human expert interprets and testifies about AI results — AI output alone is not testimony
5. Defence must have access to challenge AI methodology

## Jurisdiction-Specific Notes

| Jurisdiction | Key Restrictions |
| ------------- | ----------------- |
| **EU** | Art. 5 prohibitions + FRIA mandatory + LED (Law Enforcement Directive) applies instead of GDPR |
| **US** | 4th Amendment constraints; some cities/states ban facial recognition (San Francisco, Massachusetts) |
| **UK** | College of Policing guidance; Bridges v. South Wales Police (2020) — proportionality required |
| **China** | Extensive state surveillance; different regulatory posture |
| **Singapore** | No specific AI restrictions for law enforcement; PDPA has law enforcement exemption |

## Checklist

```text
[ ] Use case classified against EU AI Act Art. 5 prohibitions
[ ] Fundamental Rights Impact Assessment conducted
[ ] Proportionality test documented (necessity + less intrusive alternatives considered)
[ ] Bias testing across racial, ethnic, gender, and socioeconomic groups
[ ] Human oversight mechanism — AI output never sole basis for enforcement action
[ ] Facial recognition accuracy validated across demographics (if applicable)
[ ] False positive management process with human review
[ ] Data retention limited and documented
[ ] Audit trail for all AI-assisted decisions
[ ] Defence/oversight access to AI methodology
[ ] Community oversight mechanism (if applicable)
```
