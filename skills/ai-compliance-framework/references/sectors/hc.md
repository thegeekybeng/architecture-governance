# Healthcare — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Patient safety, clinical validation, medical device classification, health data protection
> **Confidence:** HIGH for regulatory frameworks; MEDIUM for specific AI-as-medical-device pathways (rapidly evolving)

## Key Healthcare AI Regulators

| Jurisdiction | Regulator | Key AI Guidance |
| ------------- | ----------- | ---------------- |
| Singapore | HSA (Health Sciences Authority) + MOH | HSA Regulatory Guidelines for SaMD, National AI Strategy (Healthcare) |
| EU | MDR (Medical Device Regulation) + national agencies | EU AI Act (healthcare = high-risk in Annex III) + MDR 2017/745 |
| US | FDA | FDA AI/ML SaMD Framework, 510(k), De Novo, PMA pathways |
| UK | MHRA | Software and AI as Medical Device guidance |
| Global | WHO | WHO Ethics & Governance of AI for Health (2021) |

## AI as a Medical Device (SaMD / AIaMD)

### Classification Question

**Is your AI system a medical device?** If it meets ANY of these criteria, it likely qualifies as SaMD:

1. Intended to diagnose, treat, cure, mitigate, or prevent disease
2. Intended to affect the structure or function of the body
3. Provides clinical decision support that healthcare professionals are not expected to independently review
4. Processes patient data to generate diagnosis, prognosis, or treatment recommendations

### Risk Classification (IMDRF Framework)

| State of Healthcare | Critical | Serious | Non-serious |
| --------------------- | ---------- | --------- | ------------- |
| **Treat or diagnose** | Class IV (highest) | Class III | Class II |
| **Drive clinical management** | Class III | Class II | Class I |
| **Inform clinical management** | Class II | Class I | Class I |

## Clinical Validation Requirements

### HC-TD-001: Clinical Evidence

**Requirement:** AI medical devices must demonstrate clinical validity through appropriate evidence.

**Implementation:**

1. Analytical validation — does the algorithm work technically? (accuracy, sensitivity, specificity)
2. Clinical validation — does it work in clinical practice? (clinical outcomes, comparative studies)
3. Clinical evaluation — ongoing post-market performance monitoring

**Evidence levels:**

```text
[ ] Training dataset description (demographics, pathology distribution, data source)
[ ] Test dataset (independent, representative of intended population)
[ ] Performance metrics (sensitivity, specificity, PPV, NPV, AUC-ROC)
[ ] Subgroup performance analysis (age, sex, ethnicity, comorbidities)
[ ] Comparison to clinical standard of care or predicate device
[ ] Prospective validation study (if Class III/IV)
[ ] Post-market surveillance plan
```

### HC-TD-002: Intended Use Statement

**Requirement:** Every AI medical device must have a precise intended use statement.

**Must specify:**

- Target condition/disease
- Target population (age, demographics, clinical setting)
- Target user (clinician specialty, training level)
- Clinical workflow integration point
- Input data types and requirements
- Output type and format
- Performance claims with supporting evidence
- Limitations and contraindications

### HC-TD-003: Clinical Decision Support Exemptions

Some CDS tools may be exempt from medical device regulation if they meet ALL four criteria (US FDA 21st Century Cures Act):

1. Not intended to acquire, process, or analyse a medical image/signal/pattern
2. Intended for healthcare professionals (not patients directly)
3. Intended to enable the professional to independently review the basis of the recommendation
4. Intended to provide recommendations rather than a specific diagnosis/treatment

> **Caution:** Exemption criteria vary by jurisdiction. Singapore (HSA) and EU (MDR) have different thresholds. Verify per jurisdiction.

## Health Data Protection

### HIPAA (US)

- Protected Health Information (PHI): 18 identifiers
- De-identification: Safe Harbor (remove 18 identifiers) or Expert Determination
- Business Associate Agreement (BAA) required for AI vendors processing PHI
- Minimum Necessary standard: Access only the minimum PHI needed

### PDPA (Singapore) — Health Data

- Health data is not a special category under PDPA, but treated with heightened sensitivity
- National Electronic Health Record (NEHR) system has separate governance
- HCSA (Healthcare Services Act) imposes additional obligations on healthcare providers

### GDPR (EU) — Health Data

- Art. 9: Health data is a "special category" — processing requires explicit consent or Art. 9(2) basis
- Art. 35: DPIA mandatory for health data processing
- Art. 22: Automated decision-making restrictions apply (right to human intervention)

### Technical Directives for Health Data

**HC-TD-004: Data De-identification**

```python
# HIPAA Safe Harbor - 18 identifiers to remove/mask
PHI_IDENTIFIERS = [
    "name", "geographic_data_below_state", "dates_except_year",
    "phone_numbers", "fax_numbers", "email_addresses",
    "social_security_numbers", "medical_record_numbers",
    "health_plan_beneficiary_numbers", "account_numbers",
    "certificate_license_numbers", "vehicle_identifiers",
    "device_identifiers", "web_urls", "ip_addresses",
    "biometric_identifiers", "full_face_photos",
    "any_other_unique_identifier"
]
```

**HC-TD-005: Audit Trail for Clinical AI**

```typescript
interface ClinicalAIAuditEntry {
  timestamp: Date;
  patientId: string;           // Pseudonymised
  clinicianId: string;
  aiSystemId: string;
  aiSystemVersion: string;
  inputDataSummary: string;    // What data was sent to AI (no raw PHI)
  aiOutput: object;            // Full AI output
  clinicianAction: 'accepted' | 'modified' | 'rejected';
  clinicianModification?: string; // What the clinician changed
  clinicalOutcome?: string;    // Follow-up outcome (for post-market monitoring)
  retentionExpiry: Date;       // Per records retention policy
}
```

## WHO Principles for AI in Health (2021)

1. **Protect autonomy** — human oversight, informed consent
2. **Promote safety and well-being** — clinical validation, post-market surveillance
3. **Ensure transparency and explainability** — document methodology, explain outputs
4. **Foster responsibility and accountability** — clear governance, incident reporting
5. **Ensure inclusiveness and equity** — diverse training data, subgroup performance
6. **Promote responsive and sustainable AI** — ongoing monitoring, environmental impact

## Singapore National AI Council — Healthcare Focus

Key priorities:

- AI-assisted diagnostic imaging (radiology, pathology)
- Clinical trial optimisation
- Population health management
- Drug discovery and development
- NLP for clinical notes and medical records
- Precision medicine and genomics

**National AI Strategy 2.0 healthcare requirements:**

- Interoperability with national health information systems
- Compliance with HCSA (Healthcare Services Act)
- Alignment with Healthier SG initiative
- Data sharing frameworks for multi-institution AI development

## Checklist

```text
[ ] Medical device classification determined (SaMD if applicable)
[ ] Intended use statement drafted and reviewed by clinical team
[ ] Clinical validation evidence package prepared
[ ] Subgroup performance analysis completed
[ ] Regulatory pathway identified (510(k), CE marking, HSA registration)
[ ] Health data protection compliance verified (HIPAA/PDPA/GDPR Art. 9)
[ ] Data de-identification implemented per jurisdiction
[ ] Clinical audit trail implemented
[ ] Post-market surveillance plan in place
[ ] Clinician training materials prepared for AI system
[ ] Patient/user informed consent mechanism implemented
[ ] Adverse event reporting process established
```
