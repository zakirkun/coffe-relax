# Entity Relationship Diagram

```mermaid
erDiagram
  PROFILE ||--o{ PROJECT : owns
  PROFILE ||--o{ TEAM_MEMBER : joins
  TEAM ||--o{ TEAM_MEMBER : has
  TEAM ||--o{ PROJECT : shares_context_for
  PROJECT ||--o{ PROJECT_FILE : indexes
  PROJECT ||--o{ AGENT_THREAD : contains
  AGENT_THREAD ||--o{ AGENT_RUN : has
  AGENT_RUN ||--o{ MODEL_EVENT : emits
  AGENT_RUN ||--o{ TOOL_CALL : requests
  TOOL_CALL ||--o{ APPROVAL : requires
  TOOL_CALL ||--o{ TOOL_RESULT : returns
  PROJECT ||--o{ MCP_SERVER : registers
  MCP_SERVER ||--o{ MCP_TOOL : exposes
  AGENT_RUN ||--o{ PATCH_PROPOSAL : creates
  PATCH_PROPOSAL ||--o{ PATCH_FILE : changes
  PROJECT ||--o{ AUDIT_EVENT : records
  AGENT_RUN ||--o{ CHECKPOINT : persists

  PROFILE { string id PK string display_name string avatar_ref string privacy_policy_json }
  TEAM { string id PK string name string sync_endpoint string status }
  TEAM_MEMBER { string team_id FK string profile_id FK string role string sharing_policy_json }
  PROJECT { string id PK string profile_id FK string team_id FK string root_path string name string settings_json }
  PROJECT_FILE { string id PK string project_id FK string relative_path string content_hash string language string indexed_at }
  AGENT_THREAD { string id PK string project_id FK string title string scope_json string created_at }
  AGENT_RUN { string id PK string thread_id FK string mode string status string model_alias string policy_version string started_at string ended_at }
  MODEL_EVENT { string id PK string run_id FK string event_type string payload_redacted_json string occurred_at }
  TOOL_CALL { string id PK string run_id FK string server_id string tool_name string risk_level string arguments_redacted_json string status }
  APPROVAL { string id PK string tool_call_id FK string decision string edited_arguments_json string decided_by string decided_at }
  TOOL_RESULT { string id PK string tool_call_id FK string status string summary string artifact_ref string completed_at }
  MCP_SERVER { string id PK string project_id FK string name string transport string endpoint string trust_state string enabled }
  MCP_TOOL { string id PK string server_id FK string name string description string schema_json string risk_level }
  PATCH_PROPOSAL { string id PK string run_id FK string status string summary string created_at }
  PATCH_FILE { string id PK string proposal_id FK string relative_path string diff_text string before_hash string after_hash }
  CHECKPOINT { string id PK string run_id FK string thread_key string state_ref string created_at }
  AUDIT_EVENT { string id PK string project_id FK string run_id FK string actor_type string event_type string metadata_json string occurred_at }
```

## Data rules

- `PROJECT.root_path` is local and never synchronized by default.
- `MCP_TOOL.schema_json` is untrusted input and must be rendered safely.
- `PATCH_FILE.before_hash` must match before application.
- `APPROVAL` is immutable after decision; corrections create a new event.
- `AUDIT_EVENT.metadata_json` is sanitized and size-bounded.
- Delete operations are soft-deleted in metadata and physically confirmed separately.
