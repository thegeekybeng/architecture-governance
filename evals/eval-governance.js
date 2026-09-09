#!/usr/bin/env node

/**
 * eval-governance.js
 * Automated evaluation suite for the architecture-governance skill.
 * Verifies:
 *  1. ADR parsing and compliance (mandatory minimum 2 rejected alternatives)
 *  2. TDR parsing and compliance (mandatory 4 Rule 8 elements: What/Why, Trade-offs, 2 Alternatives, Migration Path)
 *  3. Trade-Off Matrix verification (7 standard columns and synchronization with active ADRs/TDRs)
 *  4. Gate 2 verification engine functionality across positive and negative test cases.
 */

import fs from 'node:fs';
import path from 'node:path';

let passCount = 0;
let failCount = 0;

function assert(condition, testName, failureDetail = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}${failureDetail ? ` — ${failureDetail}` : ''}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// Governance Parsers & Validators
// -----------------------------------------------------------------------------

export function parseADRs(content) {
  const adrRegex = /##\s+(ADR-\d+)\s+—\s+([^\n(]+)(?:\(([^)]+)\))?/g;
  const adrs = [];
  let match;
  while ((match = adrRegex.exec(content)) !== null) {
    const id = match[1].trim();
    const title = match[2].trim();
    const date = match[3] ? match[3].trim() : '';
    const startIndex = match.index;
    const nextMatch = content.indexOf('## ADR-', startIndex + match[0].length);
    const endIndex = nextMatch !== -1 ? nextMatch : content.length;
    const block = content.substring(startIndex, endIndex);

    const hasContext = /\*\*Context:\*\*/i.test(block);
    const hasDecision = /\*\*Decision:\*\*/i.test(block);
    const hasConsequencesPos = /\*\*Consequences\s*\(\+\):\*\*/i.test(block);
    const hasConsequencesNeg = /\*\*Consequences\s*\(−\):\*\*/i.test(block) || /\*\*Consequences\s*\(-\):\*\*/i.test(block);
    
    // Check rejected alternatives (minimum 2 alternatives with reasons)
    const rejMatch = block.match(/\*\*Rejected alternatives:\*\*([\s\S]*?)(?=\n---|##|$)/i);
    let rejectedAlternativesCount = 0;
    let isCompliant = false;

    if (rejMatch && rejMatch[1].trim()) {
      const rejText = rejMatch[1].trim();
      // Look for bullet items or semicolons separating alternatives
      const items = rejText.split(/;|\n-\s+/).map(s => s.replace(/^[-\s*]+/, '').trim()).filter(Boolean);
      rejectedAlternativesCount = items.length;
      isCompliant = rejectedAlternativesCount >= 2 && hasContext && hasDecision;
    }

    adrs.push({
      id,
      title,
      date,
      hasContext,
      hasDecision,
      hasConsequencesPos,
      hasConsequencesNeg,
      rejectedAlternativesCount,
      isCompliant
    });
  }
  return adrs;
}

export function parseTDRs(content) {
  const tdrRegex = /###\s+(TDR-\d+):\s+([^\n]+)/g;
  const tdrs = [];
  let match;
  while ((match = tdrRegex.exec(content)) !== null) {
    const id = match[1].trim();
    const title = match[2].trim();
    const startIndex = match.index;
    const nextMatch = content.indexOf('### TDR-', startIndex + match[0].length);
    const endIndex = nextMatch !== -1 ? nextMatch : content.length;
    const block = content.substring(startIndex, endIndex);

    const hasContext = /\* \*\*Context\*\*:/i.test(block);
    const hasProposed = /\* \*\*Proposed Solution\*\*:/i.test(block);
    const hasTradeoffs = /\* \*\*Trade-offs & (?:Known )?Limitations\*\*:/i.test(block);
    const hasDecision = /\* \*\*Decision\*\*:/i.test(block);
    const hasMigrationPath = /\* \*\*Migration Path\*\*:/i.test(block);

    // Alternatives check (minimum 2)
    const altMatch = block.match(/\* \*\*Alternatives Considered\*\*:([\s\S]*?)(?=\* \*\*Decision\*\*|\* \*\*Migration Path\*\*|$)/i);
    let altCount = 0;
    if (altMatch && altMatch[1]) {
      const alts = altMatch[1].split(/\n\s*\d+\.\s+/).filter(s => s.trim().length > 0);
      altCount = alts.length;
    }

    // Rule 8 compliance: (1) what/why, (2) trade-offs, (3) min 2 alternatives, (4) migration path
    const isCompliant = hasProposed && hasTradeoffs && altCount >= 2 && hasMigrationPath;

    tdrs.push({
      id,
      title,
      hasContext,
      hasProposed,
      hasTradeoffs,
      hasDecision,
      hasMigrationPath,
      altCount,
      isCompliant
    });
  }
  return tdrs;
}

export function parseTradeOffMatrix(content) {
  const tableIndex = content.indexOf('## Architectural & Technical Trade-Off Matrix');
  if (tableIndex === -1) {
    return { exists: false, rows: [] };
  }

  const tableBlock = content.substring(tableIndex);
  const lines = tableBlock.split('\n');
  const rows = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\|\s*ID\s*\|\s*Decision/i.test(trimmed)) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (trimmed.startsWith('|---') || trimmed.startsWith('| ---')) {
        continue;
      }
      if (trimmed.startsWith('|')) {
        const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
        if (cells.length >= 7) {
          rows.push({
            id: cells[0].replace(/\[.*?\]/g, '').trim(),
            rawId: cells[0],
            component: cells[1],
            category: cells[2],
            benefit: cells[3],
            tradeoff: cells[4],
            mitigation: cells[5],
            trigger: cells[6]
          });
        }
      } else if (trimmed.startsWith('## ') || trimmed.startsWith('---')) {
        break;
      }
    }
  }

  return { exists: true, rows };
}

export function evaluateGate2({ adrContent, tdrContent }) {
  const adrs = parseADRs(adrContent || '');
  const tdrs = parseTDRs(tdrContent || '');
  const matrix = parseTradeOffMatrix(adrContent || '');

  const nonCompliantADRs = adrs.filter(a => !a.isCompliant);
  const nonCompliantTDRs = tdrs.filter(t => !t.isCompliant);

  const matrixIds = new Set(matrix.rows.map(r => r.id));
  const missingMatrixADRs = adrs.map(a => a.id).filter(id => !matrixIds.has(id));
  const missingMatrixTDRs = tdrs.map(t => t.id).filter(id => !matrixIds.has(id));

  const adrPass = adrs.length > 0 && nonCompliantADRs.length === 0;
  const tdrPass = tdrs.length === 0 || nonCompliantTDRs.length === 0;
  const matrixPass = matrix.exists && missingMatrixADRs.length === 0 && missingMatrixTDRs.length === 0;

  let status = 'FAIL';
  if (adrPass && tdrPass && matrixPass) {
    status = 'PASS';
  } else if (adrPass || tdrPass || matrix.exists) {
    status = 'PARTIAL';
  }

  return {
    status,
    totalADRs: adrs.length,
    compliantADRs: adrs.length - nonCompliantADRs.length,
    totalTDRs: tdrs.length,
    compliantTDRs: tdrs.length - nonCompliantTDRs.length,
    matrixExists: matrix.exists,
    matrixMappedRows: matrix.rows.length,
    missingMatrixADRs,
    missingMatrixTDRs
  };
}

// -----------------------------------------------------------------------------
// Test Suite Execution
// -----------------------------------------------------------------------------

console.log('===============================================================');
console.log('Architecture Governance Skill Evaluation Suite (Global Rule 2)');
console.log('===============================================================\n');

// 1. ADR Validation Tests
console.log('--- Suite 1: ADR Validation ---');

const mockValidADR = `
## ADR-001 — Microservices Tier Split (2026-09-10)

**Context:** The monolith has reached capacity constraints.
**Decision:** We extract payment services into a distinct container.
**Consequences (+):**
- Independent scaling.
- Isolated failure boundaries.
**Consequences (−):**
- Network hop latency.
- Eventual consistency requirements.
**Rejected alternatives:** Shared monolith ([rejected: CPU exhaustion]); Cloud serverless ([rejected: cost breach]).
`;

const parsedValidADR = parseADRs(mockValidADR);
assert(parsedValidADR.length === 1, 'Parse single ADR correctly');
assert(parsedValidADR[0].isCompliant === true, 'Valid ADR passes compliance check');
assert(parsedValidADR[0].rejectedAlternativesCount >= 2, 'ADR has >= 2 rejected alternatives');

const mockInvalidADR = `
## ADR-002 — In-Memory Caching (2026-09-10)

**Context:** Need fast lookups.
**Decision:** Use Node in-memory map.
**Consequences (+):** Fast.
**Consequences (−):** Memory leak potential.
**Rejected alternatives:** None.
`;

const parsedInvalidADR = parseADRs(mockInvalidADR);
assert(parsedInvalidADR[0].isCompliant === false, 'ADR with < 2 alternatives fails compliance');

// 2. TDR Validation Tests (Rule 8)
console.log('\n--- Suite 2: TDR Validation (Rule 8) ---');

const mockValidTDR = `
### TDR-01: Adopt Pino Logger for Backend Services

* **Status**: Approved & Implemented (2026-09-10)
* **Context**: Need structured JSON logging with minimal CPU overhead.
* **Proposed Solution**: Use Pino logger because of fast streaming and low GC impact.
* **Trade-offs & Known Limitations**:
  * Asynchronous logging can lose records if process exits abruptly.
  * Deep JSON payloads require serializer customization.
* **Alternatives Considered**:
  1. *Winston*: Slower JSON serialization and higher memory usage.
  2. *Bunyan*: Unmaintained for years with pending CVEs.
* **Decision**: Pino selected for raw throughput.
* **Migration Path**: Standard API can be replaced with custom console wrapper in < 1 day if abandoned.
`;

const parsedValidTDR = parseTDRs(mockValidTDR);
assert(parsedValidTDR.length === 1, 'Parse single TDR correctly');
assert(parsedValidTDR[0].isCompliant === true, 'Valid TDR satisfies all 4 Rule 8 requirements');
assert(parsedValidTDR[0].altCount >= 2, 'TDR has >= 2 alternatives considered');
assert(parsedValidTDR[0].hasMigrationPath === true, 'TDR specifies explicit migration path');

const mockInvalidTDR = `
### TDR-02: Use Axios for HTTP Requests

* **Status**: Approved
* **Context**: Need HTTP client.
* **Proposed Solution**: Use Axios.
* **Decision**: We like axios.
`;

const parsedInvalidTDR = parseTDRs(mockInvalidTDR);
assert(parsedInvalidTDR[0].isCompliant === false, 'Incomplete TDR missing Rule 8 elements fails compliance');

// 3. Trade-Off Matrix Synchronization Tests
console.log('\n--- Suite 3: Trade-Off Matrix Synchronization ---');

const mockDocWithMatrix = `
# Architecture Decisions Log

## Architectural & Technical Trade-Off Matrix

| ID | Decision / Component | Category / Dimension | Benefit Gained (+) | Cost / Trade-off Incurred (−) | Compensating Control / Mitigation | Review / Revisit Trigger |
|---|---|---|---|---|---|---|
| ADR-001 | Microservices Tier Split | Scalability | Independent scaling | Network hop latency | gRPC connections | QPS > 50,000 |
| TDR-01 | Pino Logger | Observability | Low CPU serialization | Log loss on abrupt exit | Finalization hooks | Node native structured log |

${mockValidADR}
`;

const matrixParsed = parseTradeOffMatrix(mockDocWithMatrix);
assert(matrixParsed.exists === true, 'Trade-off matrix detected');
assert(matrixParsed.rows.length === 2, 'Parsed exactly 2 rows in matrix');

const gate2Eval = evaluateGate2({
  adrContent: mockDocWithMatrix,
  tdrContent: mockValidTDR
});

assert(gate2Eval.status === 'PASS', 'Gate 2 passes when ADRs, TDRs, and Matrix are fully compliant and synchronized');
assert(gate2Eval.missingMatrixADRs.length === 0, 'No missing ADRs in Trade-Off Matrix');
assert(gate2Eval.missingMatrixTDRs.length === 0, 'No missing TDRs in Trade-Off Matrix');

// Test matrix missing a TDR
const gate2EvalMissing = evaluateGate2({
  adrContent: mockDocWithMatrix,
  tdrContent: `${mockValidTDR}\n${mockValidTDR.replace('TDR-01', 'TDR-02').replace('Adopt Pino', 'Adopt Redis')}`
});
assert(gate2EvalMissing.status === 'PARTIAL', 'Gate 2 detects unsynchronized matrix and yields PARTIAL status');
assert(gate2EvalMissing.missingMatrixTDRs.includes('TDR-02'), 'Accurately identifies missing TDR-02 in matrix');

// -----------------------------------------------------------------------------
// Real Workspace Fixture Verification
// -----------------------------------------------------------------------------
console.log('\n--- Suite 4: Workspace Fixture Self-Check ---');

const workspaceAdrPath = '/Users/ymca/.antigravity-ide/.ai-arch/07_ARCHITECTURE_DECISIONS.md';
const workspaceTdrPath = '/Users/ymca/.antigravity-ide/core-studio/SYSTEM_LOG.md';

if (fs.existsSync(workspaceAdrPath)) {
  const wsAdr = fs.readFileSync(workspaceAdrPath, 'utf8');
  const adrs = parseADRs(wsAdr);
  console.log(`Found ${adrs.length} ADRs in active workspace`);
  assert(adrs.length >= 5, 'Workspace contains at least 5 active ADRs');
  const compliantCount = adrs.filter(a => a.isCompliant).length;
  assert(compliantCount === adrs.length, `All ${adrs.length} workspace ADRs are compliant with rejected alternatives`);
}

if (fs.existsSync(workspaceTdrPath)) {
  const wsTdr = fs.readFileSync(workspaceTdrPath, 'utf8');
  const tdrs = parseTDRs(wsTdr);
  console.log(`Found ${tdrs.length} TDRs in active workspace`);
  assert(tdrs.length >= 5, 'Workspace contains at least 5 active TDRs');
  const compliantTdrCount = tdrs.filter(t => t.isCompliant).length;
  assert(compliantTdrCount === tdrs.length, `All ${tdrs.length} workspace TDRs satisfy Rule 8 requirements`);
}

if (fs.existsSync(workspaceAdrPath) && fs.existsSync(workspaceTdrPath)) {
  const wsAdr = fs.readFileSync(workspaceAdrPath, 'utf8');
  const wsTdr = fs.readFileSync(workspaceTdrPath, 'utf8');
  const wsGate2 = evaluateGate2({ adrContent: wsAdr, tdrContent: wsTdr });
  assert(wsGate2.matrixExists === true, 'Workspace contains Trade-Off Matrix');
  assert(wsGate2.matrixMappedRows === 10, `Workspace Trade-Off Matrix contains all 10 mapped rows (got ${wsGate2.matrixMappedRows})`);
  assert(wsGate2.status === 'PASS', 'Workspace Gate 2 achieves full PASS compliance');
}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n===============================================================');
console.log(`Evaluation Results: ${passCount} Passed, ${failCount} Failed`);
console.log('===============================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
