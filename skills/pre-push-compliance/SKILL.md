---
name: pre-push-compliance
description: >
  Enforce a mandatory pre-push audit checking CI/CD, Actions Workflow, Runtime/Package Manager,
  and README configurations. This skill ONLY allows Git push execution if all checks PASS.
  Triggers: "pre-push audit", "verify pre-push compliance", "push to main with audit", "git push with audit".
---

# Pre-Push Compliance Gate

## Purpose
The `pre-push-compliance` subskill is a strict gatekeeping utility designed to prevent insecure, undocumented, or broken codebases from being pushed to upstream remote repositories. It operates as a blocking checkpoint: the AI agent is only authorized to execute `git push` commands once all pre-push audits report a 100% **PASS** score.

---

## Interception and Execution Protocol

When a user requests a git push command (e.g., "push to main", "git push with audit") or when the agent is about to execute a push action, the agent **MUST** intercept the workflow and execute the following checks in order:

### Step 1: Run the Pre-Push Audit Checks

The agent must check the following five pillars deterministically in the local repository:

#### PII Compliance & Secrets Gate
- Verify that no personal names, GitHub handles, or emails are hardcoded in the codebase, issue templates, or markdown files.
- The system must dynamically extract maintainer contacts from the `.env` configuration (keys `MAINTAINER_NAME` and `MAINTAINER_EMAIL`).
- Ensure that template-driven community files are in sync with `.env` values.

#### Pillar 1: README Structure & Completeness
- Verify that a root `README.md` file exists.
- Verify that the root `README.md` documents:
  - Prerequisites (Node.js/Docker versions, etc.).
  - Dependency installation commands (e.g. `npm install`, `pnpm install`).
  - Runtime execution scripts (development, build, and test lifecycle commands).
  - Environment variable setup instructions (with references to `.env.example`).

#### Pillar 2: GitHub Actions Workflow Security (CI/CD)
Inspect all workflow configurations in `.github/workflows/*.yml` (if they exist) for the following issues:
- **CWE-1395 (Supply Chain):** All third-party actions (`uses:`) MUST be pinned to a specific SHA-256 commit hash instead of mutable tags (e.g., `uses: actions/checkout@8ade135a41bc03ea155e62e844d188df1fd717b0` instead of `uses: actions/checkout@v4`).
- **CWE-250 (Privilege Misconfiguration):** Default permissions for `GITHUB_TOKEN` must be restricted. The workflow yaml file must specify an explicit `permissions:` block (e.g., `permissions: read-all` or minimal scoped read permissions).
- **CWE-94 (Code Injection):** Untrusted variables from events (such as `github.event.issue.title` or `github.event.pull_request.title`) must NOT be evaluated directly inside shell execution scripts. They must instead be passed as environment variables.
- **CWE-798 (Hardcoded Secrets):** Verify that secrets (e.g., `${{ secrets.MY_SECRET }}`) are not printed or logged in raw shell output commands.

#### Pillar 3: Runtime & Package Manager Consistency
- **Duplicate Lockfiles:** Check the root and subdirectories to ensure no conflicting lockfiles coexist (e.g. having both `package-lock.json` and `pnpm-lock.yaml` in the same directory, which causes deployment non-determinism).
- **Runtime Engines Bounding:** Verify that `package.json` contains a populated and pinned `engines` block declaring allowed runtimes (Node.js, Bun, or Deno versions).
- **Execution Script Match:** Ensure scripts in `package.json` do not run commands for a different package manager than the one specified by the lockfile (e.g., calling `npm run` in scripts when a `pnpm-lock.yaml` lockfile exists).
- **Lockfile Synchronization:** Ensure the lockfile is up to date and not older than `package.json`.

#### Pillar 4: Dependency Vulnerability Audit
- Identify the active lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`).
- Propose and run the corresponding package manager audit command:
  - npm: `npm audit --audit-level=high`
  - pnpm: `pnpm audit --audit-level=high`
  - yarn: `yarn audit --level high`
  - bun: `bun audit`
- Verify that **zero** High or Critical vulnerabilities exist in the dependency tree.

#### Pillar 5: Automated Dependency Updates
- Verify that an automated version updater configuration exists: `.github/dependabot.yml` or `renovate.json` in the root repository.
- Verify that the config is active and covers core package manager updates.

---

### Step 2: The Gateway Verdict

Based on the audit findings, the agent must enforce the following blocking rules:

- **❌ AUDIT FAIL (Score < 100%):**
  If any check in Pillars 1–5 fails, the agent **MUST NOT** execute the `git push` command.
  The agent must output a detailed compliance failure report outlining:
    1. The exact gate/pillar that failed.
    2. The specific file and code line causing the failure.
    3. Actionable remediation requirements to resolve the audit gap.
  The push command is **ABORTED**.

- **✅ AUDIT PASS (Score = 100%):**
  If all checks in Pillars 1–5 pass, the agent is authorized to proceed.
  The agent must output a compliance clearance report and then execute the requested `git push` command.

---

## Output Template for Pre-Push Failures

If the audit fails, output the report using the following format:

```markdown
# ❌ Pre-Push Compliance Gate Blocked

**Date:** [timestamp]  **Operator:** [AI Agent Name]
**Git Target:** [branch/remote]

The repository has failed the pre-push compliance checks. To prevent deployment degradation, the push command has been blocked. Please resolve the following findings:

## ❌ Pillar 2: GitHub Actions Workflow Security (CWE-1395)
- **File:** .github/workflows/deploy.yml#L12
- **Finding:** Action `actions/checkout@v4` is not pinned to a SHA-256 commit hash.
- **Remediation:** Replace `@v4` with `@8ade135a41bc03ea155e62e844d188df1fd717b0` (or appropriate hash).

## ❌ Pillar 3: Runtime & Package Manager Consistency
- **File:** / (Root directory)
- **Finding:** Found conflicting lockfiles: package-lock.json and pnpm-lock.yaml coexist.
- **Remediation:** Remove the unused lockfile to ensure deployment determinism.

## ❌ Pillar 4: Dependency Vulnerability Audit (CWE-1395 / OWASP A03)
- **Audit Tool:** `npm audit`
- **Finding:** Found 2 High vulnerability advisories (e.g. prototype pollution in lodash).
- **Remediation:** Run `npm audit fix` or upgrade the vulnerable packages.
```
