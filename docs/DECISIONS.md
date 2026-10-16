# Decision Log

## Accepted

| ID | Decision | Reason |
|---|---|---|
| ADR-001 | Desktop-only MVP | Tauri native capabilities and local-first workflows are the differentiator |
| ADR-002 | Local profiles first | Avoid identity/backend complexity before the core workflow is proven |
| ADR-003 | VS Code-inspired UX | Preserves familiarity without assuming full workbench embedding is feasible |
| ADR-004 | LangChain.js orchestration | Provides agent tools, middleware, checkpoints, and approval interrupts |
| ADR-005 | AI SDK gateway boundary | Keeps provider routing and streaming replaceable and observable |
| ADR-006 | Explicit MCP approvals | Arbitrary tool servers are a security boundary |
| ADR-007 | Coworking as light context | Keeps MVP focused on the Agentic IDE |
| ADR-008 | React + TypeScript frontend | Strong ecosystem for IDE layouts, Monaco, and AI streaming UI |
| ADR-009 | Monaco Editor foundation | Provides a VS Code-familiar editing foundation and editor APIs |
| ADR-010 | Bundled Node sidecar for agents | Keeps LangChain/AI SDK in TypeScript without requiring a user-installed runtime |
| ADR-011 | All supported MCP transports in MVP | Covers local stdio and modern HTTP-based MCP deployments behind one policy broker |
| ADR-012 | Hosted/self-hosted gateway adapter | Preserves one AI SDK-compatible contract across deployment environments |
| ADR-013 | SQLite plus OS keychain | Separates structured local state from platform-protected credentials |
| ADR-014 | Product name is Coffe | Establishes the project identity for the IDE Agentic Coding product |
| ADR-015 | MIT license | Permits use, modification, distribution, and commercial resale with notices retained |
| ADR-016 | Local-only persistence for now | Avoids premature sync, account, conflict, and privacy complexity |
| ADR-017 | Latest stable official MCP TypeScript SDK | Follows the current protocol implementation while pinning the exact version in lockfiles at implementation start |
| ADR-018 | Self-contained per-platform sidecar binary | Users do not need to install Node.js and runtime supply-chain inputs are controlled |

## Open before implementation

1. Exact MCP SDK version and transport compatibility matrix at implementation start.
2. Final sidecar bundler/toolchain and signing process per platform.
3. Whether team metadata sync is introduced after the local-only MVP.

## Evidence notes

- Tauri v2 documentation indicates explicit capability/path scopes for filesystem access and explicit permission for sidecar execution.
- LangChain.js documentation supports agent middleware, human-in-the-loop interrupts, checkpointers, and durable execution modes.
- AI SDK documentation supports gateway model identifiers/provider abstraction and streaming/tool events.
- These notes are implementation inputs, not a substitute for version-pinned dependency review during setup.
