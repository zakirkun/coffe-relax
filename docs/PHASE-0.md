# Phase 0 Foundation

## Delivered

- Coffe project metadata and MIT license.
- React + TypeScript + Vite frontend scaffold.
- Tauri v2 Rust shell with minimal `core:default` capability.
- Local-only runtime information and profile commands.
- Typed Tauri-to-agent protocol package.
- MCP compatibility policy for stdio, SSE, and Streamable HTTP.
- Self-contained sidecar packaging boundary documented.

## Threat model baseline

| Asset | Threat | Phase 0 control |
|---|---|---|
| Local source | Out-of-root reads/writes | No filesystem plugin capability yet; future commands must scope roots |
| Credentials | Renderer exposure | OS keychain boundary documented; no secrets in renderer |
| MCP server | Arbitrary local/remote code | Default-disabled registration and policy broker contract |
| Agent sidecar | Forged or confused messages | Protocol version, run ID, sequence, and typed events |
| Tool action | Unapproved side effect | Approval event is a required protocol state |
| Gateway traffic | Data leakage | Explicit gateway boundary; credentials stay outside renderer |
| Audit data | Sensitive persistence | Redaction and bounded metadata required in later phase |

## Packaging decision

Development may run the TypeScript sidecar with a local Node process. Release builds must package a self-contained executable per target platform so users do not install Node.js. The exact bundler and signing process remain Phase 0 follow-up decisions.

## MCP compatibility matrix

| Transport | MVP intent | Policy requirement | SDK version |
|---|---|---|---|
| stdio | Local process servers | Process ownership, timeout, output cap, approval | Pin latest stable official SDK at implementation start |
| SSE | HTTP streaming servers | Endpoint allowlist, TLS, timeout, response cap | Pin latest stable official SDK at implementation start |
| Streamable HTTP | Modern HTTP MCP servers | Endpoint allowlist, TLS, timeout, response cap | Pin latest stable official SDK at implementation start |

## Exit criteria

- `npm install` and `npm run build` succeed.
- `npm run tauri info` reports a usable Tauri environment.
- `cargo check` succeeds in `src-tauri`.
- The app shell renders with local-only status visible.
- No filesystem, shell, network, or MCP capability is enabled accidentally by default.
