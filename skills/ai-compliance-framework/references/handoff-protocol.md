# Policy Handoff Protocol Template

> **Purpose:** Template for generating jurisdiction-switching specifications for multi-national AI agents.
> **Used by:** Mode 3 (`handoff`) of the Governance Encoded skill

## Jurisdiction Detection Methods

### Method 1: User IP Geolocation

```text
Pros: Automatic, no user friction
Cons: VPN/proxy bypass, accuracy varies, doesn't handle corporate networks well
Best for: Consumer-facing applications
Implementation: MaxMind GeoIP2, IP-API, CloudFlare headers (CF-IPCountry)
```

### Method 2: User Registration Country

```text
Pros: Explicit, legally defensible
Cons: May not reflect current location, stale data
Best for: Account-based services
Implementation: Registration form country field, KYC data
```

### Method 3: Data Residency

```text
Pros: Clear for data protection compliance
Cons: Doesn't address user rights per location
Best for: Infrastructure/backend compliance
Implementation: Database region tags, storage bucket location
```

### Method 4: User Self-Selection

```text
Pros: Respects user autonomy, handles edge cases
Cons: User burden, may select incorrectly
Best for: Multi-regional platforms, where user preference matters
Implementation: Country/region picker in settings
```

### Method 5: Entity Registration

```text
Pros: Legally authoritative for corporate entities
Cons: Doesn't address end-user jurisdiction
Best for: B2B platforms, API consumers
Implementation: Business registration country in contract/API key metadata
```

## Policy Switch Parameter Definitions

Each parameter below must be configured per jurisdiction in the handoff protocol:

### Core Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| `ai_disclosure` | `required` / `recommended` / `optional` | Whether the system must inform users of AI involvement |
| `consent_model` | `explicit_opt_in` / `legitimate_interest` / `notice_only` / `none` | Consent framework for data processing |
| `explanation_depth` | `full` / `summary` / `on_request` / `none` | How detailed AI decision explanations must be |
| `human_review_trigger` | `all_decisions` / `high_risk_only` / `on_request` / `none` | When human review is available/required |
| `content_filter_level` | `strict` / `moderate` / `minimal` / `none` | Content moderation stringency |
| `data_residency` | `[list of allowed regions]` | Where data may be stored/processed |
| `retention_max_days` | `integer` | Maximum data retention period |
| `right_to_delete` | `true` / `false` | Whether users can request data deletion |
| `right_to_explanation` | `true` / `false` | Whether users can request decision explanations |
| `incident_report_days` | `integer` | Deadline for reporting incidents to authorities |
| `bias_audit_required` | `true` / `false` | Whether periodic bias audits are mandatory |
| `bias_audit_frequency_months` | `integer` | Frequency of bias audits |
| `pii_anonymisation` | `required` / `recommended` / `none` | PII handling in AI processing |
| `cross_border_transfer` | `adequacy_only` / `safeguards` / `consent` / `unrestricted` | Data transfer restrictions |
| `watermark_ai_content` | `required` / `recommended` / `none` | AI content labelling requirements |

### Agentic-Specific Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| `agent_delegation_transparency` | `required` / `recommended` / `none` | Must disclose when agent delegates to sub-agents |
| `agent_tool_audit` | `required` / `recommended` / `none` | Must log all tool/API calls by agents |
| `agent_autonomy_cap` | `full` / `bounded` / `advisory_only` | Maximum autonomy level |
| `sub_agent_jurisdiction_inherit` | `strictest` / `parent` / `independent` | How sub-agents inherit jurisdiction rules |

## Default Parameter Values by Jurisdiction

```json
{
  "EU": {
    "ai_disclosure": "required",
    "consent_model": "explicit_opt_in",
    "explanation_depth": "full",
    "human_review_trigger": "high_risk_only",
    "content_filter_level": "moderate",
    "data_residency": ["eu-*", "eea-*", "adequacy-decision-countries"],
    "retention_max_days": 730,
    "right_to_delete": true,
    "right_to_explanation": true,
    "incident_report_days": 15,
    "bias_audit_required": true,
    "bias_audit_frequency_months": 12,
    "pii_anonymisation": "required",
    "cross_border_transfer": "adequacy_only",
    "watermark_ai_content": "required",
    "agent_delegation_transparency": "required",
    "agent_tool_audit": "required",
    "agent_autonomy_cap": "bounded",
    "sub_agent_jurisdiction_inherit": "strictest"
  },
  "SG": {
    "ai_disclosure": "recommended",
    "consent_model": "explicit_opt_in",
    "explanation_depth": "summary",
    "human_review_trigger": "high_risk_only",
    "content_filter_level": "moderate",
    "data_residency": ["ap-southeast-1", "any-with-consent"],
    "retention_max_days": 1825,
    "right_to_delete": true,
    "right_to_explanation": false,
    "incident_report_days": 3,
    "bias_audit_required": false,
    "bias_audit_frequency_months": 12,
    "pii_anonymisation": "recommended",
    "cross_border_transfer": "consent",
    "watermark_ai_content": "recommended",
    "agent_delegation_transparency": "recommended",
    "agent_tool_audit": "recommended",
    "agent_autonomy_cap": "full",
    "sub_agent_jurisdiction_inherit": "parent"
  },
  "US": {
    "ai_disclosure": "optional",
    "consent_model": "notice_only",
    "explanation_depth": "on_request",
    "human_review_trigger": "on_request",
    "content_filter_level": "minimal",
    "data_residency": ["us-*", "any"],
    "retention_max_days": 2555,
    "right_to_delete": false,
    "right_to_explanation": false,
    "incident_report_days": 30,
    "bias_audit_required": false,
    "bias_audit_frequency_months": 0,
    "pii_anonymisation": "recommended",
    "cross_border_transfer": "unrestricted",
    "watermark_ai_content": "recommended",
    "agent_delegation_transparency": "none",
    "agent_tool_audit": "recommended",
    "agent_autonomy_cap": "full",
    "sub_agent_jurisdiction_inherit": "independent"
  },
  "CN": {
    "ai_disclosure": "required",
    "consent_model": "explicit_opt_in",
    "explanation_depth": "summary",
    "human_review_trigger": "all_decisions",
    "content_filter_level": "strict",
    "data_residency": ["cn-*"],
    "retention_max_days": 180,
    "right_to_delete": true,
    "right_to_explanation": true,
    "incident_report_days": 1,
    "bias_audit_required": true,
    "bias_audit_frequency_months": 6,
    "pii_anonymisation": "required",
    "cross_border_transfer": "adequacy_only",
    "watermark_ai_content": "required",
    "agent_delegation_transparency": "required",
    "agent_tool_audit": "required",
    "agent_autonomy_cap": "bounded",
    "sub_agent_jurisdiction_inherit": "strictest"
  }
}
```

## Conflict Resolution Strategies

### Strategy 1: Strictest Rule Wins (Default)

For each parameter, apply the most restrictive value across all applicable jurisdictions. Safest legally but may over-restrict user experience.

### Strategy 2: Home Jurisdiction Priority

Apply home jurisdiction rules as baseline. Override only when destination jurisdiction has a MANDATORY requirement that is stricter.

### Strategy 3: User Jurisdiction Priority (GDPR Extraterritorial)

The jurisdiction of the data subject takes priority. This is the GDPR model — EU rules follow EU residents wherever the data is processed.

### Strategy 4: Per-Parameter Negotiation

Different parameters use different strategies based on legal risk:

- Data residency → Strictest rule wins (high legal risk)
- Content filtering → Home jurisdiction (cultural norms differ)
- AI disclosure → Strictest rule wins (low implementation cost)
- Bias audit → Strictest rule wins (best practice regardless)

## Handoff Trigger Events

| Event | Detection Method | Action |
| ------- | ----------------- | -------- |
| User location change | IP geolocation shift | Load new jurisdiction profile |
| Data transfer initiated | API call to external region | Apply transfer safeguards |
| Agent delegation to foreign sub-agent | Sub-agent metadata | Inherit strictest profile |
| Regulatory deadline | Calendar/cron | Upgrade compliance baseline |
| User jurisdiction selection change | UI event | Reload compliance profile |
| New user registration | Registration event | Set initial jurisdiction profile |

## Implementation Architecture

```text
┌─────────────────────────────────────────────────┐
│                   AI Agent                       │
│  ┌───────────────────────────────────────────┐  │
│  │        Jurisdiction Middleware              │  │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Detector │→│ Resolver │→│ Enforcer │ │  │
│  │  └─────────┘  └──────────┘  └──────────┘ │  │
│  └───────────────────────────────────────────┘  │
│           ↓               ↓           ↓          │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ Compliance  │  │ Content    │  │ Data     │  │
│  │ Profile DB  │  │ Filter    │  │ Router   │  │
│  └────────────┘  └────────────┘  └──────────┘  │
└─────────────────────────────────────────────────┘

Detector: Determines jurisdiction (IP, registration, user selection)
Resolver: Resolves conflicts when multiple jurisdictions apply
Enforcer: Applies the resolved compliance profile to the agent's behaviour
```
