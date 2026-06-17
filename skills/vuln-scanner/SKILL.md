---
name: vuln-scanner
description: >
  Use when the user wants to scan a live website, web application, or network
  service for security vulnerabilities from the outside (DAST). Triggers: "scan
  this site", "find vulnerabilities on", "pentest", "security scan URL",
  "check if this site is vulnerable". Not for source code analysis — use
  run-security-scanner for SAST instead.
---

# External Vulnerability Scanner (DAST)

Orchestrates external security scanning of live websites and services using
Nuclei, nmap, and supporting reconnaissance tools. Produces structured
vulnerability reports as artifacts.

## ⚖️ LEGAL GATE — MANDATORY (No Exceptions)

**Before ANY scan executes, the agent MUST present this acknowledgment and
obtain explicit user confirmation. No scan runs without a "yes".**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ⚠️  LEGAL ACKNOWLEDGMENT                     │
│                                                                 │
│  Scanning a system without authorization is illegal under:      │
│  • Computer Misuse Act (Singapore)                              │
│  • Computer Fraud and Abuse Act (USA)                           │
│  • Computer Misuse Act 1990 (UK)                                │
│  • Equivalent laws in most jurisdictions                        │
│                                                                 │
│  By proceeding, you confirm:                                    │
│                                                                 │
│  1. You OWN the target system, OR                               │
│  2. You have WRITTEN AUTHORIZATION from the owner to test it    │
│                                                                 │
│  RESPONSIBLE DISCLOSURE:                                        │
│  Any vulnerability discovered will be immediately flagged       │
│  to the site/system owner. This tool is for defensive           │
│  security assessment ONLY — never for exploitation.             │
│                                                                 │
│  DISCLAIMER:                                                    │
│  This tool is provided as-is for authorized security testing.   │
│  The user assumes full legal responsibility for its use.        │
│  The tool author and AI agent bear no liability for misuse.     │
│                                                                 │
│  Do you confirm authorization and accept these terms? (yes/no)  │
└─────────────────────────────────────────────────────────────────┘
```

**If the user says anything other than an unambiguous "yes"** → abort. Do not
scan. Do not ask again in the same session.

## When to Use

- User wants to scan a **live URL or IP** for vulnerabilities
- User asks for a penetration test / security assessment of a running service
- User wants to check if their deployed app has known CVEs or misconfigurations

## When NOT to Use

- Source code analysis → use `run-security-scanner` (SAST)
- Dependency auditing → use `scan_dependencies`
- Threat modeling → use `determine-threat-model`
- The target is NOT owned by the user and no written auth exists

## Prerequisites

The following tools must be installed on the host. The skill will check for
each before proceeding and provide install instructions for any missing tool.

All ProjectDiscovery tools ship as **pre-compiled binaries** — no Go toolchain
required. Download from GitHub Releases for your architecture (`linux_amd64`
for most x86 servers, `linux_arm64` for ARM).

| Tool | Purpose | Install (linux_amd64) |
|------|---------|----------------------|
| `nuclei` | Template-based vuln scanner (CVEs, misconfigs, exposures) | See install commands below |
| `nmap` | Port/service enumeration + NSE vuln scripts | `sudo apt install nmap` |
| `httpx` | HTTP probing and technology detection | See install commands below |
| `subfinder` | (Optional) Subdomain enumeration | See install commands below |

### Install via pre-compiled binaries

```bash
# Nuclei
curl -sL https://github.com/projectdiscovery/nuclei/releases/latest/download/nuclei_$(curl -sL https://api.github.com/repos/projectdiscovery/nuclei/releases/latest | grep tag_name | cut -d'"' -f4 | sed 's/v//')_linux_amd64.zip -o /tmp/nuclei.zip \
  && unzip -o /tmp/nuclei.zip -d /tmp/nuclei-bin \
  && sudo mv /tmp/nuclei-bin/nuclei /usr/local/bin/ \
  && rm -rf /tmp/nuclei.zip /tmp/nuclei-bin

# httpx
curl -sL https://github.com/projectdiscovery/httpx/releases/latest/download/httpx_$(curl -sL https://api.github.com/repos/projectdiscovery/httpx/releases/latest | grep tag_name | cut -d'"' -f4 | sed 's/v//')_linux_amd64.zip -o /tmp/httpx.zip \
  && unzip -o /tmp/httpx.zip -d /tmp/httpx-bin \
  && sudo mv /tmp/httpx-bin/httpx /usr/local/bin/ \
  && rm -rf /tmp/httpx.zip /tmp/httpx-bin

# subfinder (optional)
curl -sL https://github.com/projectdiscovery/subfinder/releases/latest/download/subfinder_$(curl -sL https://api.github.com/repos/projectdiscovery/subfinder/releases/latest | grep tag_name | cut -d'"' -f4 | sed 's/v//')_linux_amd64.zip -o /tmp/subfinder.zip \
  && unzip -o /tmp/subfinder.zip -d /tmp/subfinder-bin \
  && sudo mv /tmp/subfinder-bin/subfinder /usr/local/bin/ \
  && rm -rf /tmp/subfinder.zip /tmp/subfinder-bin

# nmap
sudo apt install -y nmap
```

### Alternative: Docker (no host install needed)

If you prefer not to install binaries on the host:

```bash
# Nuclei via Docker
docker run --rm projectdiscovery/nuclei -u <TARGET_URL> -severity high,critical

# httpx via Docker
echo "<TARGET_URL>" | docker run --rm -i projectdiscovery/httpx -silent -tech-detect

# subfinder via Docker
docker run --rm projectdiscovery/subfinder -d <domain>
```

## Scan Workflow

```
1. LEGAL GATE        → Present acknowledgment, require explicit "yes"
2. RECON             → Probe target with httpx (tech stack, status, headers)
3. PORT SCAN         → nmap service detection on common ports
4. VULN SCAN         → Nuclei with severity-filtered templates
5. REPORT            → Generate structured artifact with findings
6. DISCLOSURE DRAFT  → Generate responsible disclosure template if critical findings exist
```

### Step 1: Legal Gate

Present the acknowledgment block above. Wait for confirmation. Abort on
anything other than explicit consent.

### Step 2: Reconnaissance

```bash
# Probe the target — tech detection, status codes, response headers
echo "<TARGET_URL>" | httpx -silent -tech-detect -status-code -title \
  -content-length -web-server -follow-redirects -json -o recon.json
```

Parse and summarize: HTTP status, web server, technologies detected, title,
security headers present/missing.

### Step 3: Port Scan

```bash
# Service detection on top 1000 ports (non-intrusive)
nmap -sV -sC --top-ports 1000 -oN nmap_scan.txt -oX nmap_scan.xml <TARGET_HOST>
```

**Important:** Use `-T3` (normal timing) maximum. Never use `-T4` or `-T5`
on targets you don't control infrastructure for — it's aggressive and may
trigger IDS/IPS or cause service disruption.

### Step 4: Vulnerability Scan

```bash
# Update Nuclei templates first
nuclei -update-templates

# Run scan — filter to medium+ severity, output JSON
nuclei -u <TARGET_URL> -severity medium,high,critical \
  -json -o nuclei_findings.json \
  -rate-limit 50 \
  -bulk-size 25 \
  -concurrency 10 \
  -timeout 10 \
  -retries 2 \
  -no-interactsh
```

**Rate limiting is mandatory.** Never remove `-rate-limit`. This prevents
overwhelming the target and getting banned or causing disruption.

**Template categories to include:**

| Category | What it catches |
|----------|----------------|
| `cves/` | Known CVEs in detected software |
| `vulnerabilities/` | Generic web vulns (SQLi, XSS, SSRF, etc.) |
| `misconfiguration/` | Security misconfigs (open redirects, CORS, etc.) |
| `exposures/` | Exposed panels, configs, backups, debug endpoints |
| `technologies/` | Technology fingerprinting |

**To scan specific categories only:**
```bash
nuclei -u <TARGET_URL> -t cves/ -t exposures/ -severity high,critical \
  -json -o nuclei_critical.json -rate-limit 50 -no-interactsh
```

### Step 5: Generate Report

Create an artifact at the conversation's artifact directory:

**Filename:** `vuln_scan_report_<target_domain>_<YYYY-MM-DD>.md`

**Report structure:**

```markdown
# Vulnerability Scan Report

> [!CAUTION]
> This report contains security findings. Handle with care.
> Any critical or high findings must be disclosed to the site owner immediately.

## Target Information

| Field | Value |
|-------|-------|
| Target URL | `<url>` |
| Scan Date | YYYY-MM-DD HH:MM (timezone) |
| Scanner | Nuclei vX.X.X + nmap X.XX |
| Authorization | Confirmed by user (self-owned / written auth) |

## Executive Summary

- **Critical:** X findings
- **High:** X findings
- **Medium:** X findings
- **Info:** X findings (if any)

## Findings

### 🔴 Critical

#### [CVE-XXXX-XXXXX] <Title>
- **Severity:** CRITICAL
- **CWE:** CWE-XXX
- **URL:** `<matched_url>`
- **Description:** ...
- **Remediation:** ...
- **Reference:** <link to CVE/advisory>

### 🟠 High
...

### 🟡 Medium
...

## Reconnaissance Summary

### HTTP Probe
- Status: ...
- Server: ...
- Technologies: ...
- Security Headers: (present/missing checklist)

### Open Ports
| Port | Service | Version |
|------|---------|---------|

## Responsible Disclosure

> [!IMPORTANT]
> If this scan was performed on a third-party system with authorization,
> the following findings MUST be reported to the system owner.

<disclosure draft — see Step 6>

## Disclaimer

This scan was performed with explicit authorization from the system owner.
The results are provided for defensive security assessment purposes only.
Any vulnerability discovered is flagged for immediate remediation.
Unauthorized use of these findings for exploitation is strictly prohibited.
```

### Step 6: Responsible Disclosure Draft

If **critical or high findings** exist, generate a disclosure email template:

```markdown
## Disclosure Email Template

Subject: Security Vulnerability Report — <domain>

Dear Security Team,

During an authorized security assessment of <domain> conducted on <date>,
the following vulnerabilities were identified:

1. [CRITICAL] <title> — <brief description>
2. [HIGH] <title> — <brief description>

**Impact:** <brief impact summary>

**Recommended Actions:**
- <remediation step 1>
- <remediation step 2>

I am available to provide additional technical details or assist with
remediation. Please acknowledge receipt within 5 business days.

This report follows responsible disclosure practices. A 90-day disclosure
window is standard — findings will not be published before that period
or before remediation, whichever comes first.

Regards,
<your name>
```

## Quick Scan vs Full Scan

| Mode | Command | Use When |
|------|---------|----------|
| **Quick** | `nuclei -u <URL> -severity critical,high -rate-limit 100 -no-interactsh` | Fast check for critical issues only |
| **Standard** | Full workflow above | Regular security assessment |
| **Deep** | Add `-t cves/ -t vulnerabilities/ -t exposures/ -t misconfiguration/` + nmap `--script vuln` | Comprehensive audit |

## Subdomain Enumeration (Optional)

If the user wants to scan the full attack surface:

```bash
# Find subdomains
subfinder -d <domain> -silent -o subdomains.txt

# Probe which are alive
cat subdomains.txt | httpx -silent -o alive_hosts.txt

# Scan all alive hosts
nuclei -l alive_hosts.txt -severity medium,high,critical \
  -json -o nuclei_full.json -rate-limit 30 -no-interactsh
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Scanning without legal confirmation | Always present the legal gate first |
| Removing rate limits | Keep `-rate-limit` — always |
| Using aggressive nmap timing (`-T5`) | Use `-T3` maximum on external targets |
| Scanning targets user doesn't own | Abort — no exceptions |
| Not generating disclosure draft | Always generate for critical/high findings |
| Running `--interactsh` on third-party targets | Use `-no-interactsh` — OOB testing hits external servers |

## Interpreting Results

**False positives are common.** Before reporting a finding as confirmed:

1. Check if the matched URL actually returns the vulnerable response
2. Verify the detected version against the CVE's affected versions
3. Cross-reference with the technology stack detected in recon
4. Mark unverified findings as "Requires Manual Verification" in the report

## Security of Scan Data

- Scan results contain sensitive information — treat as confidential
- Reports are stored only in the conversation artifact directory
- Do not log raw scan output to shared/public locations
- Delete scan artifacts after remediation is confirmed
