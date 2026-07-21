# Critical Infrastructure — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Safety-critical systems, operational resilience, environmental protection, national security
> **Subsectors covered:** Oil & Gas, Energy/Utilities, Transport, Water, Telecommunications
> **Confidence:** HIGH for safety frameworks; MEDIUM for AI-specific application (emerging area)

## What Qualifies as Critical Infrastructure AI?

AI systems operating within or controlling critical infrastructure face the **highest regulatory scrutiny** because failures can cause physical harm, environmental damage, or systemic economic disruption.

### EU AI Act Classification

- **Annex III §2:** AI used as safety components in the management and operation of critical digital infrastructure, road traffic, water/gas/heating/electricity supply → **HIGH-RISK**
- **Annex I:** AI embedded in regulated products (machinery, pressure equipment, marine equipment) → **HIGH-RISK** with third-party conformity assessment

### US Critical Infrastructure Sectors (CISA)

16 sectors including Energy, Transportation, Water, Communications, Chemical, Nuclear. AI in these sectors falls under sector-specific regulators. Note: EO 14110 requirements (rescinded Jan 2025) are no longer in effect; NIST AI RMF voluntary guidance applies.

### Singapore Critical Information Infrastructure (CII)

Cybersecurity Act 2018 designates CII sectors: Energy, Water, Healthcare, Banking/Finance, Transport, Infocomm, Government, Media. AI within CII must comply with CSA (Cyber Security Agency) requirements.

---

## Oil & Gas (O&G) — AI-Specific Requirements

### O&G AI Use Cases and Risk Classification

| Use Case | Risk Level | Key Concern |
| ---------- | ----------- | ------------- |
| **Predictive maintenance** (pumps, compressors, pipelines) | HIGH | Equipment failure → explosion, spill, injury |
| **Drilling optimisation** | HIGH | Wellbore instability, blowout risk |
| **Reservoir modelling** | MEDIUM | Financial impact; safety if linked to well planning |
| **Pipeline integrity management** | CRITICAL | Leak/rupture → environmental catastrophe, fatalities |
| **Process safety / alarm management** | CRITICAL | False negative alarms → missed safety events |
| **Autonomous inspection** (drones, ROVs) | HIGH | Equipment operating in hazardous zones |
| **Emissions monitoring & reporting** | MEDIUM | Regulatory compliance, ESG obligations |
| **Supply chain optimisation** | LOW | Commercial impact only |
| **Seismic interpretation** | MEDIUM | Exploration decisions; indirect safety impact |
| **HSE incident prediction** | HIGH | Worker safety decisions based on AI |

### O&G Safety Standards Intersecting AI

| Standard | Scope | AI Relevance |
| ---------- | ------- | ------------- |
| **IEC 61511 / ISA 84** | Safety Instrumented Systems (SIS) | AI in SIS requires SIL (Safety Integrity Level) assessment; AI-based SIS functions are NOT currently endorsed without extensive validation |
| **IEC 61508** | Functional safety of E/E/PE systems | Governs safety-related control systems; AI novelty challenges deterministic safety proofs |
| **API 580/581** | Risk-Based Inspection (RBI) | AI models for RBI must demonstrate equivalent or better performance than conventional methods |
| **OSHA PSM (29 CFR 1910.119)** | Process Safety Management (US) | Management of Change (MOC) applies to AI model updates; Mechanical Integrity applies to AI-monitored equipment |
| **COMAH / Seveso III** | Major Accident Hazards (EU/UK) | AI in control systems of upper-tier COMAH sites requires safety case demonstration |
| **ISO 55000** | Asset Management | AI for asset management must integrate with asset management system |
| **DNV-RP-0510 / DNV-RP-0513** | Framework for assurance of data-driven algorithms / AI in safety-related applications | DNV recommended practice specifically for AI/ML in O&G and maritime safety applications |

### CI-TD-001: Safety Integrity Level (SIL) Assessment for AI

**Requirement:** AI systems influencing safety-critical decisions in O&G must undergo SIL assessment per IEC 61511.

**Challenge:** IEC 61511/61508 were designed for deterministic systems. ML models are non-deterministic — the standards do not straightforwardly accommodate probabilistic AI.

**Current Industry Practice:**

1. AI may be used for **advisory/monitoring** functions outside the SIS boundary
2. AI within the SIS safety loop requires demonstration of deterministic behaviour OR equivalent safety performance through alternative evidence
3. DNV-RP-0513 provides a pathway for AI in safety-related applications with additional assurance steps
4. Independent third-party verification of AI safety claims (DNV, Lloyd's Register, Bureau Veritas)

**Technical Directive:**

```text
[ ] AI system classified as safety-related or non-safety-related
[ ] If safety-related: SIL target determined per IEC 61511
[ ] If safety-related: AI model failure modes identified (false positive, false negative, latency)
[ ] If safety-related: AI failure probability quantified and compared to SIL target
[ ] If advisory only: Clear boundary documented between AI advisory output and SIS/human decision
[ ] Management of Change (MOC) process established for AI model updates
[ ] Third-party verification engagement planned (if safety-related)
```

### CI-TD-002: Management of Change (MOC) for AI Models

**Requirement:** Under OSHA PSM and equivalent regulations, any change to process control systems requires formal MOC review. AI model retraining, parameter updates, or data pipeline changes constitute a "change."

**Implementation:**

1. Every AI model version change triggers MOC review
2. MOC review includes: hazard analysis, impact assessment, training requirements, pre-startup safety review
3. Model rollback capability required — ability to revert to previous validated version
4. Parallel operation period (old model + new model) before cutover for safety-critical applications
5. Change documentation retained per regulatory retention requirements

**Technical Directive:**

```typescript
interface AIModelChange {
  modelId: string;
  previousVersion: string;
  newVersion: string;
  changeType: 'retrain' | 'parameter_update' | 'architecture_change' | 'data_pipeline_change';
  changeDescription: string;
  hazardAnalysis: {
    newHazardsIntroduced: string[];
    existingHazardsAffected: string[];
    mitigationMeasures: string[];
  };
  mocReviewDate: Date;
  mocReviewers: string[];        // Named individuals
  mocApprover: string;           // Accountable person
  parallelOperationStart?: Date;
  parallelOperationEnd?: Date;
  preStartupReviewDate?: Date;
  rollbackProcedure: string;
}
```

### CI-TD-003: Alarm Management with AI

**Requirement:** AI systems that filter, prioritise, or suppress alarms in O&G facilities must comply with ISA-18.2 / IEC 62682 (Alarm Management).

**Critical concern:** An AI system that suppresses a genuine alarm (false negative) can directly cause a safety event.

**Implementation:**

1. AI alarm filtering must NEVER suppress safety-critical alarms (SIL-rated alarms)
2. AI may assist with nuisance alarm reduction but must maintain alarm in "shelved" (reviewable) state
3. All AI-influenced alarm state changes must be logged with full audit trail
4. Alarm performance metrics (ISA-18.2 KPIs) must include AI-specific metrics:

   - AI false suppression rate (must be near zero for safety alarms)
   - AI-assisted response time improvement
   - Operator override rate (how often operators reject AI alarm decisions)

5. Regular review by alarm management team including AI model performance

### CI-TD-004: Emissions Monitoring AI

**Requirement:** AI used for continuous emissions monitoring or methane leak detection must meet regulatory accuracy requirements.

**Relevant regulations:**

| Jurisdiction | Regulation | Requirement |
| ------------- | ----------- | ------------- |
| US | EPA 40 CFR Part 60/63 | CEMS accuracy requirements; RATA (Relative Accuracy Test Audit) |
| EU | EU ETS MRR (Monitoring and Reporting Regulation) | Uncertainty thresholds per tier |
| Singapore | Environmental Protection and Management Act | Emission monitoring per NEA requirements |
| Global | OGMP 2.0 (Oil and Gas Methane Partnership) | Gold Standard requires site-level measurement |

**Technical Directive:**

```text
[ ] AI emissions model validated against reference methods (RATA equivalent)
[ ] Uncertainty quantification included in AI predictions
[ ] Calibration and drift correction procedures documented
[ ] Regulatory accuracy thresholds met (per jurisdiction)
[ ] AI model performance reported alongside or replacing traditional CEMS
[ ] OGMP 2.0 Gold Standard compliance pathway documented (if applicable)
```

---

## General Critical Infrastructure AI Requirements

### CI-TD-005: Operational Resilience

**Requirement:** AI systems in critical infrastructure must not become single points of failure.

**Implementation:**

1. Manual fallback procedures documented and tested for every AI-dependent process
2. AI system availability targets defined (99.9%+ for safety-critical)
3. Graceful degradation — system continues safe operation if AI fails
4. Regular failover testing (at least annually)
5. Cybersecurity assessment specific to AI attack vectors (data poisoning, adversarial inputs, model inversion)

### CI-TD-006: Cybersecurity for Industrial AI

**Relevant standards:**

- IEC 62443 (Industrial cybersecurity)
- NIST CSF (Cybersecurity Framework)
- NIS2 Directive (EU — essential entities)
- Singapore Cybersecurity Act (CII designation)

**AI-specific cybersecurity concerns:**

| Attack Vector | Impact | Mitigation |
| -------------- | -------- | ------------ |
| **Training data poisoning** | Model learns incorrect behaviour → safety risk | Data provenance, validation, anomaly detection in training data |
| **Adversarial sensor input** | Manipulated sensor readings trick AI → wrong control action | Input validation, redundant sensors, anomaly detection |
| **Model extraction** | Attacker steals proprietary process model | Model access controls, API rate limiting, watermarking |
| **Model inversion** | Attacker infers training data (proprietary process data) | Differential privacy, output perturbation |
| **Supply chain compromise** | Compromised ML libraries or pre-trained models | Software bill of materials (SBOM), dependency scanning |

### CI-TD-007: Environmental Impact Assessment

**Requirement:** AI systems in O&G/energy/chemical must include environmental risk in their impact assessment.

**Implementation:**

1. Document environmental scenarios where AI failure could cause harm (spill, emission, discharge)
2. Quantify worst-case environmental impact per failure mode
3. Environmental incident response plan includes AI failure scenarios
4. AI system monitoring includes environmental compliance thresholds

### CI-TD-008: Workforce Transition and Competency

**Requirement:** Introduction of AI in critical infrastructure must include workforce competency management.

**Implementation:**

1. Operator training programme for AI-augmented operations
2. Clear documentation of AI decision boundaries — what AI decides vs. what operators decide
3. Competency assessment for operators working with AI systems
4. Fatigue management for human-AI teaming (alert fatigue, automation complacency)
5. Procedures for operators to override AI recommendations safely

## Checklist

```text
[ ] AI system classified by safety criticality (safety-related vs. advisory)
[ ] SIL assessment completed (if safety-related)
[ ] Management of Change (MOC) process established for AI model updates
[ ] Manual fallback procedures documented and tested
[ ] Cybersecurity assessment (IEC 62443 / NIS2) including AI-specific vectors
[ ] Environmental impact assessment includes AI failure scenarios
[ ] Alarm management compliance verified (ISA-18.2) if AI affects alarms
[ ] Operator competency programme includes AI-specific training
[ ] Third-party verification planned (DNV, LR, BV) if safety-related
[ ] Regulatory accuracy requirements met for monitoring applications
[ ] Data provenance and integrity for safety-critical training data
[ ] Model rollback capability verified
[ ] Parallel operation / shadow mode testing completed before cutover
```
