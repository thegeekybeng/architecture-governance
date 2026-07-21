# Agent Architecture Compliance Profiles

> **Purpose:** Baseline compliance characteristics of popular AI agent frameworks.
> **Confidence:** HIGH for architectural features; MEDIUM for compliance implications (architecture ≠ automatic compliance).
> **Last updated:** 2026-06

## LangGraph

**Architecture:** Stateful graph-based agent orchestration (by LangChain)
**License:** MIT
**Source:** <https://github.com/langchain-ai/langgraph>

### Compliance-Relevant Features

| Feature | Description | Governance Impact |
| --------- | ------------- | ------------------- |
| **Explicit state machine** | Agent flow defined as directed graph with nodes and edges | ✅ Full auditability — every decision path is predefined and inspectable |
| **Checkpointing** | Automatic state persistence at each node | ✅ Enables rollback, replay, and audit trail (Art. 12 EU AI Act) |
| **`interrupt_before` / `interrupt_after`** | Built-in human-in-the-loop breakpoints | ✅ Native human oversight support (Art. 14 EU AI Act) |
| **State channels** | Typed, validated state passed between nodes | ✅ Data flow is explicit and inspectable — aids data governance |
| **Subgraphs** | Nested graphs for modular agent composition | ✅ Clear boundaries for component-level compliance assessment |
| **Streaming** | Token-level and state-level streaming | ⚠️ Neutral — aids transparency but requires explicit implementation |
| **Persistence** | Built-in persistence backends (SQLite, Postgres) | ✅ Enables audit log retention requirements |
| **Time travel** | Replay from any checkpoint | ✅ Investigation/forensics capability for incident response |

### Compliance Gaps

| Gap | Impact | Mitigation |
| ----- | -------- | ------------ |
| No built-in content filtering | Must add safety layer for GenAI measures (CN, EU) | Add content filter node before output |
| No built-in bias detection | Fairness testing is developer responsibility | Integrate fairness toolkit (Fairlearn, AIF360) |
| No native consent management | Privacy consent not handled by framework | Build consent middleware at application layer |
| No built-in explanation generation | Explainability requires explicit implementation | Add explanation node that documents decision path |

### Overall Rating: ✅ STRONG compliance enabler

Best-in-class for human oversight, auditability, and state management. Gaps are in application-layer concerns that no framework handles natively.

---

## CrewAI

**Architecture:** Role-based multi-agent with hierarchical process management
**License:** MIT
**Source:** <https://github.com/crewAIInc/crewAI>

### CrewAI — Compliance-Relevant Features

| Feature | Description | Governance Impact |
| --------- | ------------- | ------------------- |
| **Role assignment** | Agents have defined roles, goals, backstories | ⚠️ Aids accountability but roles are prompt-defined, not enforced |
| **Task delegation** | Agents can delegate to other agents autonomously | ❌ Opaque delegation chain — hard to trace who decided what |
| **Hierarchical process** | Manager agent oversees task execution | ⚠️ Simulates oversight but is AI-on-AI, not human oversight |
| **Sequential process** | Tasks executed in order | ✅ Predictable execution flow aids auditability |
| **Memory (short/long-term)** | Shared memory across agents | ⚠️ Data governance concern — what's retained and for how long? |
| **Tool use** | Agents can use tools (APIs, search, code exec) | ⚠️ Tool access requires explicit safety boundaries |
| **Callbacks** | Event hooks for monitoring | ✅ Can be used for audit logging and alerting |

### CrewAI — Compliance Gaps

| Gap | Impact | Mitigation |
| ----- | -------- | ------------ |
| **Autonomous delegation is opaque** | Violates transparency (EU Art. 13) — affected person can't trace decision chain | Disable `allow_delegation` for high-risk tasks; log all delegation events |
| **"Manager" agent ≠ human oversight** | Hierarchical mode doesn't satisfy Art. 14 — AI supervising AI is not human oversight | Add human checkpoint before final output for high-risk decisions |
| **No built-in checkpointing** | No rollback capability; if agent fails mid-task, state is lost | Implement external state persistence |
| **Memory retention unbounded** | Long-term memory may retain PII beyond retention period | Implement TTL on memory entries; add PII scrubbing |
| **No state inspection** | Can't inspect intermediate reasoning at arbitrary points | Add verbose logging to all agent steps |

### Overall Rating: ⚠️ REQUIRES SIGNIFICANT MITIGATION for high-risk AI

Role-based model is intuitive but autonomous delegation and AI-on-AI oversight create governance gaps. Suitable for low/minimal risk; requires substantial wrapping for high-risk.

---

## AutoGen (Microsoft)

**Architecture:** Conversational multi-agent with code execution capabilities
**License:** MIT (CC-BY-4.0 for docs)
**Source:** <https://github.com/microsoft/autogen>

### AutoGen — Compliance-Relevant Features

| Feature | Description | Governance Impact |
| --------- | ------------- | ------------------- |
| **Conversational agents** | Agents communicate via natural language messages | ⚠️ Full conversation logs available but unstructured |
| **Code execution** | Built-in Docker/local code execution | ❌ Major safety and data governance risk — arbitrary code can access data |
| **GroupChat** | Multi-agent group conversation with speaker selection | ⚠️ Non-deterministic speaker selection makes audit complex |
| **Human proxy agent** | `UserProxyAgent` for human-in-the-loop | ✅ Native human oversight mechanism |
| **Function calling** | Structured tool use via function definitions | ✅ Explicit, auditable tool invocations |
| **Nested chats** | Sub-conversations for complex tasks | ⚠️ Nested context can obscure decision provenance |

### AutoGen — Compliance Gaps

| Gap | Impact | Mitigation |
| ----- | -------- | ------------ |
| **Arbitrary code execution** | Data leak risk; code can exfiltrate data, access filesystem | Use Docker sandbox with no network; restrict filesystem access; no PII in exec context |
| **Non-deterministic GroupChat** | Speaker selection varies — same input may produce different decision paths | Pin speaker order for high-risk flows; log speaker selection rationale |
| **Unstructured conversation logs** | Compliance auditors need structured evidence, not chat transcripts | Add structured event logging alongside conversation logs |
| **No built-in state persistence** | Conversation state is in-memory only | Implement checkpoint persistence for conversation history |
| **Code execution + PII** | If user data enters code execution context, privacy violation | Data classification gate before code execution; block PII from sandbox |

### Overall Rating: ❌ HIGH COMPLIANCE RISK for regulated use cases

Code execution capability is powerful but creates significant safety and privacy risks. Suitable for internal tooling with strong sandboxing; not recommended for customer-facing high-risk AI without extensive guardrails.

---

## LangChain / LCEL

**Architecture:** Chain-based composition with sequential/parallel execution
**License:** MIT
**Source:** <https://github.com/langchain-ai/langchain>

### LangChain — Compliance-Relevant Features

| Feature | Description | Governance Impact |
| --------- | ------------- | ------------------- |
| **LCEL (Expression Language)** | Declarative chain composition | ✅ Chain structure is inspectable and documented |
| **Structured output** | Pydantic model binding for outputs | ✅ Type-safe outputs aid data governance |
| **Tool binding** | Explicit tool/function binding to models | ✅ Controlled, auditable tool access |
| **Callbacks** | Comprehensive callback system (LangSmith, custom) | ✅ Rich audit logging capability |
| **Retrieval** | RAG pipeline components | ⚠️ Retrieved context may contain PII — needs filtering |
| **LangSmith** | Observability platform (paid) | ✅ Built-in tracing, evaluation, monitoring |

### LangChain — Compliance Gaps

| Gap | Impact | Mitigation |
| ----- | -------- | ------------ |
| **No native human-in-the-loop** | Chains execute end-to-end without breakpoints | Use LangGraph for human oversight needs |
| **RAG PII leakage** | Retrieved documents may contain PII that enters prompt context | Add PII filter between retrieval and generation |
| **No built-in state persistence** | Chains are stateless by default | Use external state management |
| **Callback data retention** | LangSmith may retain prompts containing PII | Configure PII redaction in callbacks; self-host LangSmith |

### Overall Rating: ⚠️ GOOD BASELINE, limited for agentic compliance

Solid for simple chain-based AI (RAG, structured generation). Lacks agentic governance features — use LangGraph for anything requiring human oversight or audit trails.

---

## Semantic Kernel (Microsoft)

**Architecture:** Plugin-based orchestration with enterprise planner
**License:** MIT
**Source:** <https://github.com/microsoft/semantic-kernel>

### Semantic Kernel — Compliance-Relevant Features

| Feature | Description | Governance Impact |
| --------- | ------------- | ------------------- |
| **Plugin system** | Skills/functions registered as typed plugins | ✅ Clear capability boundaries; each plugin is auditable |
| **Planner** | AI selects and sequences plugin calls | ⚠️ Planner decisions need logging for transparency |
| **Filters** | Pre/post execution filters on functions | ✅ Enables content filtering, PII scrubbing, audit logging |
| **Memory connectors** | Pluggable memory backends | ⚠️ Data governance depends on backend choice |
| **Azure integration** | Native Azure AI integration | ✅ Inherits Azure compliance certifications |
| **Prompt templates** | Managed, versioned prompt templates | ✅ Prompt versioning aids reproducibility |

### Semantic Kernel — Compliance Gaps

| Gap | Impact | Mitigation |
| ----- | -------- | ------------ |
| **Planner opacity** | AI-selected plan may not be explainable | Log planner decisions; add human approval for high-risk plans |
| **No built-in human oversight** | No interrupt/checkpoint mechanism | Implement approval gate via filters |
| **Microsoft ecosystem lock-in** | Azure dependency may conflict with data residency | Self-host or use non-Azure connectors |

### Overall Rating: ✅ GOOD for enterprise with Azure stack

Strong plugin boundaries and filter system enable compliance. Planner needs wrapping for transparency. Best fit for organisations already in the Microsoft ecosystem.

---

## Comparison Summary

| Dimension | LangGraph | CrewAI | AutoGen | LangChain | Semantic Kernel |
| ----------- | ----------- | -------- | --------- | ----------- | ---------------- |
| **Transparency** | ✅ State graph | ⚠️ Opaque delegation | ⚠️ Chat logs | ✅ LCEL inspectable | ⚠️ Planner opacity |
| **Human Oversight** | ✅ Native | ❌ AI-on-AI only | ✅ UserProxy | ❌ None | ⚠️ Via filters |
| **Auditability** | ✅ Checkpoints | ⚠️ Callbacks | ⚠️ Conversation | ✅ LangSmith | ✅ Filters |
| **Safety** | ✅ Rollback | ⚠️ No rollback | ❌ Code exec risk | ⚠️ Stateless | ✅ Filters |
| **Data Governance** | ✅ Typed state | ⚠️ Memory mgmt | ❌ Code exec leak | ⚠️ RAG PII | ⚠️ Backend-dependent |
| **Privacy** | ⚠️ App layer | ⚠️ Memory retention | ❌ Sandbox needed | ⚠️ LangSmith PII | ✅ Azure compliance |
| **Fairness** | ⚠️ App layer | ⚠️ App layer | ⚠️ App layer | ⚠️ App layer | ⚠️ App layer |
| **Best For** | High-risk agentic | Low-risk multi-agent | Internal tooling | RAG / chains | Enterprise / Azure |
