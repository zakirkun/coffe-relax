# Implementation Plan

## Phase 0: Decisions and foundations

1. Initialize the Coffe repository with the MIT license and notices.
2. Scaffold React + TypeScript and define Rust project structure.
3. Define the bundled Node sidecar packaging target for each desktop OS.
4. Define the Tauri-to-sidecar command/event protocol and threat model.
5. Pin the latest stable official MCP TypeScript SDK and record the compatibility matrix.
6. Create ADRs for Monaco, SQLite/keychain, gateway adapters, local-only persistence, and MCP trust.

## Phase 1: Desktop shell

- Scaffold Tauri v2 desktop app.
- Add secure capability files with minimal scopes.
- Implement project root selection and local profile.
- Add SQLite migrations and repository/service layers.
- Build React app shell: title bar, activity rail, explorer, Monaco editor region, terminal, agent panel.

**Exit criteria:** offline app opens a project, reads scoped files, persists profile and layout, and denies out-of-scope paths.

## Phase 2: Coding workspace

- Implement editor adapter and tabs.
- Integrate Monaco with the editor adapter and diff model.
- Add search, command palette, diff viewer, and terminal lifecycle.
- Add project instructions and context selection.
- Add Git read/status adapter.

**Exit criteria:** user can inspect and manually edit a local project with keyboard-first navigation.

## Phase 3: Agent runtime

- Implement TypeScript agent service protocol.
- Package and launch the Node sidecar through Tauri with health checks and shutdown handling.
- Add LangChain agent with scoped context tools.
- Add checkpoints and run state machine.
- Add AI SDK gateway adapter and streaming event translation.
- Add hosted and self-hosted gateway adapter configuration.
- Add cancellation and bounded process execution.

**Exit criteria:** explain, plan, and diagnose flows work with streamed events and durable run records.

## Phase 4: Safe mutations

- Implement patch proposal format.
- Render file diffs and conflict state.
- Add explicit apply/reject actions.
- Add test/verification tool policy.

**Exit criteria:** no generated file mutation occurs without a visible accepted patch.

## Phase 5: MCP and coworking context

- Add MCP registration/discovery broker.
- Add stdio, SSE, and Streamable HTTP transport adapters behind the broker.
- Add risk classification and approval UI.
- Add audit timeline.
- Add team/project manifest and privacy controls.
- Keep sync disabled; reserve only a future boundary/interface.

**Exit criteria:** a registered MCP server can expose tools, sensitive calls pause, and every decision is auditable.

## Phase 6: Hardening and release

- Threat-model review and dependency/license review.
- Cross-platform packaging.
- Offline, failure, cancellation, and upgrade tests.
- Accessibility and visual QA.
- Crash diagnostics and support bundle.

**Exit criteria:** release candidate meets P0 acceptance criteria and has documented known limitations.

## Test strategy

- Unit: policy, path scopes, patch application, state transitions, redaction.
- Integration: Tauri command/event protocol, SQLite migrations, agent runtime.
- Contract: gateway events, MCP schemas, sidecar protocol.
- Packaging: sidecar startup, authentication, health, crash, and upgrade behavior.
- End-to-end: open project, explain, plan, approve patch, cancel, resume.
- Security: path traversal, command injection, prompt injection, malicious MCP schema/output, secret leakage.
