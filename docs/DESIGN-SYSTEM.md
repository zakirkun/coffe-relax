# Design System

## Product character

**Quietly powerful, inspectable, and human-controlled.** The interface should feel like a serious editor with an AI collaborator, not a chatbot wrapped around a code editor. Density is useful, but hierarchy and state must remain clear.

## Visual direction

- Neutral graphite base with warm paper-like surfaces for readable code and prose.
- One electric accent for active state and agent activity.
- Amber for approval/warning, red for destructive/error, green for verified/success.
- Thin borders, restrained shadows, compact controls, generous content rhythm.
- Avoid decorative gradients behind code; use subtle atmospheric texture only in empty states.

## Tokens

```css
:root {
  --color-bg: #111315;
  --color-surface: #181b1f;
  --color-surface-raised: #20252b;
  --color-surface-inset: #0c0e10;
  --color-border: #30363d;
  --color-text: #eef1f3;
  --color-text-muted: #9ca6ae;
  --color-text-subtle: #707a83;
  --color-accent: #66d9ef;
  --color-accent-strong: #2db8da;
  --color-success: #76d69b;
  --color-warning: #f2c66d;
  --color-danger: #f07f80;
  --font-ui: "IBM Plex Sans", "Segoe UI", sans-serif;
  --font-code: "JetBrains Mono", "Cascadia Code", monospace;
  --radius-sm: 4px;
  --radius-md: 7px;
  --radius-lg: 10px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
}
```

## Layout

- Activity rail: 48px.
- Explorer/sidebar: 240-320px, resizable.
- Editor minimum: 480px.
- Agent panel: 360-460px, resizable.
- Status bar: 24px.
- Use a 4px spacing grid; align controls to 28px or 32px heights.

## Typography

- UI body: 13-14px, line height 1.45.
- Editor: user-configurable; default 13px/1.5.
- Panel title: 12px uppercase or sentence case with semibold weight.
- Primary page/task title: 20-24px, never oversized.
- Use code font for paths, commands, model IDs, tool names, and event IDs.

## Components

### Agent message

Separate user prompt, model response, tool activity, approval request, and result. Never collapse approval state into ordinary chat text.

### Approval card

Must show tool name, server, risk, exact arguments, affected paths/processes, and Approve, Edit, Deny actions. Destructive actions use the danger color only for the action affordance.

### Diff viewer

Show file path, before/after status, hunk navigation, and apply/reject controls. Applying a proposal is a primary action only after the diff is visible.

### Run timeline

Use compact event rows with timestamp, actor, status, duration, and expandable redacted detail.

### Coworking context chip

Small, non-intrusive chip showing project/team/place context. It must expose privacy state and never imply that source files are shared.

## Interaction rules

- Keyboard navigation is first-class.
- Never use color alone for status.
- Preserve focus after streaming updates.
- Keep cancellation visible while work is active.
- Use inline validation for paths and policies; reserve modal dialogs for approvals and destructive actions.
- Honor reduced motion.

## States to design

- Empty project, loading project, indexing, offline gateway, provider error.
- Agent streaming, waiting approval, tool running, cancelled, interrupted, resumed.
- Patch conflict, patch applied, patch rejected.
- MCP disabled, discovery pending, untrusted server, tool denied.
- Private coworking context, shared metadata, sync unavailable.
