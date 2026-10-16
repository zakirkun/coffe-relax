# Product Requirements Document

## 1. Product

**Product name:** Coffe

**Subtitle:** Your IDE Agentic Coding

**One-line value proposition:** A calm, local-first desktop coding workspace where a developer can inspect a project, ask an agent to plan or change code, approve tool actions, and collaborate with a coworking team without leaving the workspace.

## 2. Problem

Developers currently switch between an editor, terminal, browser, AI chat, MCP clients, and team context. This creates fragmented context, unsafe implicit automation, duplicated setup, and weak visibility into what an agent changed. Coworking teams also lack a shared project context that respects local ownership and privacy.

## 3. Goals

1. Provide a fast desktop coding workspace with VS Code-inspired information architecture.
2. Make agent actions inspectable, streamable, resumable, and approval-driven.
3. Keep source code and credentials local by default.
4. Support MCP tools without treating third-party tools as trusted by default.
5. Provide lightweight coworking context without turning MVP into a booking or social network product.
6. Make model routing, cost, latency, and failures observable.

## 4. Non-goals for MVP

- Full VS Code workbench compatibility.
- Cloud synchronization of source files.
- Desk/room booking, payments, or access control.
- Enterprise SSO, organization billing, or centralized admin.
- Autonomous unrestricted shell execution.
- Training or fine-tuning models.
- Mobile or browser-first client.
- Cloud synchronization; MVP data remains local.

## 5. Target users

### Primary: independent builder

Needs to open local repositories, understand unfamiliar code, make bounded changes, and retain control over every side effect.

### Secondary: coworking project team

Needs shared project metadata, team presence, and a lightweight place context while each member keeps source and secrets local.

### Tertiary: workspace operator

Needs safe defaults, diagnostics, and policy visibility without requiring an enterprise control plane in MVP.

## 6. MVP scope

### Workspace

- Local folder/repository open and recent projects.
- File tree, tabs, split editor, search, command palette, integrated terminal.
- Git status and diff viewing through a local adapter.
- Project settings and agent instructions stored in the project.

### Agentic coding

- Chat panel scoped to project, selection, file, or terminal output.
- Plan mode that produces an actionable change plan without mutation.
- Edit mode that presents proposed patches before applying them.
- Explain, test, refactor, and diagnose task templates.
- Streaming text, tool-call status, diffs, and run timeline.
- Conversation checkpoints and resume after approval or interruption.

### MCP

- Explicit local MCP server registration.
- Capability discovery and human-readable tool catalog.
- Per-server trust state and per-tool risk classification.
- Approval dialog for write, execute, delete, network, and credential-sensitive actions.
- Audit trail for tool requests, approvals, denials, and results.

### Coworking context

- Local profile and display name.
- Workspace/team metadata.
- Shared project manifest containing project name, owner, members, and status.
- Local presence and status context; synchronization is deferred.
- Privacy controls for what is shared.

### Gateway and models

- AI SDK-compatible gateway boundary.
- Provider/model alias selection.
- Per-project model policy and token budget.
- Stream cancellation and retry only for safe, idempotent requests.
- Redacted request/response metadata for diagnostics.

## 7. Functional requirements

| ID | Requirement | Priority | Acceptance signal |
|---|---|---:|---|
| FR-01 | User can open a local project and restore its layout | P0 | Project reopens with tabs and workspace state |
| FR-02 | User can ask an agent to inspect selected files | P0 | Agent cites files and does not mutate |
| FR-03 | User can request a plan before edits | P0 | Plan is rendered as ordered steps with risks |
| FR-04 | User can preview and apply a patch | P0 | Diff is reviewable; apply is explicit |
| FR-05 | Agent can run approved tools and stream progress | P0 | Each tool call has lifecycle state |
| FR-06 | Sensitive tools pause for approval | P0 | No sensitive tool executes before approval |
| FR-07 | User can cancel an agent run | P0 | New tool calls stop; running process receives cancellation |
| FR-08 | User can register and disable an MCP server | P0 | Disabled server cannot receive calls |
| FR-09 | User can choose model and budget policy | P1 | Run records selected policy and usage |
| FR-10 | User can see local project/team context | P1 | Context is visible and privacy-scoped |
| FR-11 | User can inspect audit history | P1 | Events are filterable by run, tool, and outcome |
| FR-12 | App works without cloud account for local workflows | P0 | File browsing and local tools work offline |

## 8. Quality requirements

- Security: least-privilege Tauri capabilities; no unrestricted filesystem or shell permissions.
- Privacy: secrets are never sent to a model unless explicitly included by policy and user action.
- Reliability: interrupted runs are resumable from a durable checkpoint where possible.
- Performance: editor interactions remain responsive while agent work streams in the background.
- Accessibility: keyboard-first navigation, visible focus, readable contrast, reduced-motion support.
- Portability: no mandatory Node/Python installation; external runtimes may be packaged as approved sidecars.

## 9. Success metrics

- A new user opens a project and receives a grounded explanation in under 3 minutes.
- At least 80% of generated edits are applied through the diff review path, not direct mutation.
- Sensitive tool execution has 100% approval/audit coverage.
- P0 workflows complete offline except model calls.
- Agent cancellation leaves no new unapproved side effect.

## 10. Risks

- VS Code reuse assumptions can create licensing, runtime, or extension-host constraints.
- MCP servers are arbitrary code and must be treated as a local supply-chain boundary.
- Agent output can be plausible but wrong; grounding and patch review are mandatory.
- Local-first state complicates team synchronization and conflict resolution.
- Gateway outage or provider policy changes can interrupt runs.
