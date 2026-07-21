# Financial Services — AI Compliance Overlay

> **Applies on top of:** Jurisdiction baseline
> **Key drivers:** Model risk management, fairness in credit/insurance, explainability, market integrity
> **Confidence:** HIGH — financial AI regulation is mature and well-documented

## Key Financial AI Regulators

| Jurisdiction | Regulator | Key AI Guidance |
| ------------- | ----------- | ---------------- |
| Singapore | MAS (Monetary Authority of Singapore) | FEAT Principles (2018), MAS Notice 655 (Model Risk), Guidelines on Individual Accountability |
| EU | EBA, EIOPA, ESMA, national supervisors | EU AI Act + EBA Guidelines on ML for IRB, MiFID II algo trading |
| US | OCC, Fed, FDIC, SEC, CFPB | OCC SR 11-7 (Model Risk Management), Fair Lending (ECOA/FHFA) |
| UK | FCA, PRA, Bank of England | DP5/22 AI & ML, FCA Principles for Business |
| Global | BCBS (Basel Committee) | Newsletter on machine learning in banking supervision |

## MAS FEAT Principles (Singapore)

### Fairness

- AI decisions must not systematically disadvantage individuals based on personal attributes (race, gender, age, religion, disability)
- Where personal attributes are used, there must be a justifiable business reason
- Fairness metrics must be measured and monitored (statistical parity, equalised odds, calibration)
- Regular fairness reviews at least annually

**Technical Directive FIN-TD-001:**

```python
# Required fairness metrics for credit scoring
fairness_metrics = {
    "statistical_parity_difference": 0.1,   # Max acceptable disparity
    "equal_opportunity_difference": 0.1,
    "predictive_parity_difference": 0.1,
    "calibration_within_groups": True,
}
# Test across: gender, age_group, ethnicity, nationality, disability_status
```

### Ethics

- AI use aligned with organisational values and societal norms
- Internal ethics review for novel AI applications
- Consideration of downstream societal impacts

### Accountability

- **Clear ownership:** Named individual accountable for each AI model
- **Model inventory:** Centralised registry of all AI models in use
- **Validation:** Independent model validation (separate from development team)
- **Governance:** Board/senior management oversight of material AI decisions

**Technical Directive FIN-TD-002:**

```typescript
// Model registry entry (required for each AI model)
interface ModelRegistryEntry {
  modelId: string;
  modelName: string;
  version: string;
  owner: string;              // Named individual
  validator: string;          // Independent validator
  riskTier: 'Tier1' | 'Tier2' | 'Tier3';
  lastValidationDate: Date;
  nextReviewDate: Date;
  materialityAssessment: 'material' | 'non-material';
  deploymentStatus: 'development' | 'testing' | 'production' | 'retired';
}
```

### Transparency

- Customers informed when AI influences decisions affecting them
- Appropriate explanations of AI-driven decisions (proportionate to impact)
- Regulators must be able to understand model methodology on request

## Model Risk Management (OCC SR 11-7 / MAS Notice 655)

### Three Lines of Defence

| Line | Responsibility | AI Requirement |
| ------ | --------------- | ---------------- |
| **1st Line** | Model development & use | Model documentation, ongoing monitoring, issue escalation |
| **2nd Line** | Model validation & risk management | Independent validation, model risk appetite, policies |
| **3rd Line** | Internal audit | Audit model risk framework effectiveness, compliance verification |

### Model Lifecycle Requirements

1. **Development:** Documentation of methodology, assumptions, data, limitations
2. **Validation:** Independent testing (backtesting, benchmarking, sensitivity analysis, stress testing)
3. **Implementation:** IT controls, access management, change management
4. **Monitoring:** Performance tracking, data drift detection, trigger-based review
5. **Retirement:** Decommissioning procedure, data retention, successor model transition

**Technical Directive FIN-TD-003:**

```text
Required model documentation (minimum):
[ ] Model purpose and intended use
[ ] Methodology description (algorithm, architecture, hyperparameters)
[ ] Training data description (source, period, features, transformations)
[ ] Performance metrics (accuracy, AUC, Gini, KS, precision, recall)
[ ] Limitations and known failure modes
[ ] Assumptions and their validity conditions
[ ] Fairness testing results across protected attributes
[ ] Sensitivity analysis / stress testing results
[ ] Ongoing monitoring plan (metrics, frequency, thresholds)
[ ] Model change log (version history with rationale)
```

## Credit Scoring & Lending AI

### Anti-Discrimination Requirements

| Jurisdiction | Law | Protected Attributes |
| ------------- | ----- | --------------------- |
| Singapore | No specific AI anti-discrimination law; MAS FEAT covers fairness | Race, religion, gender (FEAT principles) |
| US | ECOA, Fair Housing Act, CFPB guidance | Race, color, religion, national origin, sex, marital status, age |
| EU | EU AI Act Annex III (credit scoring = high-risk) + anti-discrimination directives | All Art. 21 Charter grounds |
| UK | Equality Act 2010 + FCA Principles | Age, disability, gender, race, religion, sexual orientation, etc. |

### Adverse Action Notices

**Requirement (US — ECOA):** When credit is denied or terms are unfavorable due to AI, the applicant must receive specific reasons.

**Technical Directive FIN-TD-004:**

```typescript
// Adverse action explanation (required for US credit decisions)
interface AdverseActionNotice {
  applicantId: string;
  decisionDate: Date;
  decision: 'denied' | 'unfavorable_terms';
  reasons: string[];        // Max 4 principal reasons, specific and actionable
  modelUsed: string;        // Model ID from registry
  rightToDispute: string;   // Contact information for disputes
  creditBureauUsed?: string; // If credit report was a factor
}
```

## Algorithmic Trading (EU MiFID II / US SEC)

**Requirements:**

- Algorithm testing before deployment (backtest + paper trading)
- Kill switches for automated trading systems
- Real-time monitoring and alerting
- Audit trail of all algorithmic decisions
- Annual self-assessment of algorithmic trading systems
- Notification to regulator of algorithmic trading activity

## Insurance AI (EU EIOPA / SG MAS)

**Key concerns:**

- Pricing discrimination (especially health, life insurance)
- Claims automation fairness
- Actuarial justification for AI-derived risk factors
- Proxy discrimination (using non-protected features that correlate with protected attributes)

## Checklist

```text
[ ] FEAT principles assessment completed (SG)
[ ] Model risk management framework in place (3 lines of defence)
[ ] Model registry with all AI models catalogued
[ ] Independent model validation completed
[ ] Fairness metrics defined and measured across protected attributes
[ ] Adverse action explanations generated for negative decisions
[ ] Customer AI disclosure implemented
[ ] Ongoing model monitoring with drift detection
[ ] Regular fairness reviews scheduled (at least annually)
[ ] Board/senior management reporting on AI model risk
[ ] Regulator notification completed (if required)
```
