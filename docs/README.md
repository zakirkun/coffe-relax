# Coffe

Documentation baseline: **v0.2**

The product is a desktop-first, local-first Agentic IDE for coworking teams. It combines a VS Code-inspired coding workspace with project-aware AI agents, explicit MCP tool approval, local profiles, and lightweight coworking context.

**Subtitle:** Your IDE Agentic Coding

**License:** MIT. Commercial use and resale are permitted; copyright and license notices must be retained.

## Documents

- [Product Requirements Document](./PRD.md)
- [Architecture](./ARCHITECTURE.md)
- [Entity Relationship Diagram](./ERD.md)
- [User Flows](./FLOWCHART.md)
- [Implementation Plan](./PLAN.md)
- [Roadmap](./ROADMAP.md)
- [Design System](./DESIGN-SYSTEM.md)
- [Decision Log](./DECISIONS.md)

## Baseline Decisions

- Tauri v2 desktop shell; Windows, macOS, and Linux are first-release targets.
- Local-first storage and local profiles; hosted identity is deferred.
- VS Code-inspired UX, not an assumption that the full VS Code workbench can be embedded.
- LangChain.js owns agent orchestration, state, middleware, and human approval checkpoints.
- AI SDK owns model/provider normalization and streaming at the gateway boundary.
- React + TypeScript is the frontend baseline, with Monaco as the editor foundation.
- Agent orchestration runs in a bundled Node sidecar, not in the renderer or Rust core.
- MCP MVP supports stdio, SSE, and Streamable HTTP through one policy broker.
- Gateway integration supports both hosted and self-hosted deployments through one adapter contract.
- SQLite stores structured state and the OS keychain stores credentials and secrets.
- All Coffe state remains local for now; cloud synchronization is deferred.
- MCP servers are registered explicitly and every write, execute, or network-sensitive tool requires approval.
- Coworking features are contextual: workspace, team, presence, shared projects, and location context. Booking is later.

## Status

This is a product and technical design baseline, not an implementation commitment. Items marked **Open** need a decision before the relevant build phase.
