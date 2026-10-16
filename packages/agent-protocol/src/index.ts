export type AgentRunMode = "explain" | "plan" | "edit" | "diagnose";

export type AgentRunStatus =
  | "queued"
  | "streaming"
  | "waiting-approval"
  | "running-tool"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "interrupted";

export interface AgentRunRequest {
  protocolVersion: "0.1";
  runId: string;
  projectRoot: string;
  mode: AgentRunMode;
  prompt: string;
  context: AgentContext;
  modelAlias: string;
  budgetTokens?: number;
}

export interface AgentContext {
  filePaths: string[];
  selectedText?: string;
  terminalOutput?: string;
  instructions?: string;
}

export interface AgentEventBase {
  protocolVersion: "0.1";
  runId: string;
  sequence: number;
}

export type AgentEvent =
  | (AgentEventBase & { type: "ready"; sidecarVersion: string })
  | (AgentEventBase & { type: "status"; status: AgentRunStatus })
  | (AgentEventBase & { type: "text-delta"; text: string })
  | (AgentEventBase & { type: "tool-request"; toolCallId: string; toolName: string; riskLevel: ToolRiskLevel; arguments: unknown })
  | (AgentEventBase & { type: "approval-required"; toolCallId: string })
  | (AgentEventBase & { type: "patch-proposal"; proposalId: string; files: PatchFile[] })
  | (AgentEventBase & { type: "error"; code: string; message: string })
  | (AgentEventBase & { type: "completed"; summary: string });

export type ToolRiskLevel = "read" | "write" | "execute" | "delete" | "network" | "secret";

export interface PatchFile {
  path: string;
  diff: string;
  beforeHash: string;
  afterHash: string;
}

export interface AgentApprovalDecision {
  protocolVersion: "0.1";
  runId: string;
  toolCallId: string;
  decision: "approve" | "edit" | "deny";
  editedArguments?: unknown;
}

export interface McpCompatibilityPolicy {
  sdkPolicy: "latest-stable-official-typescript-sdk";
  transports: ["stdio", "sse", "streamable-http"];
  defaultTrust: "disabled";
  sensitiveToolApproval: "required";
}

export const mcpCompatibilityPolicy: McpCompatibilityPolicy = {
  sdkPolicy: "latest-stable-official-typescript-sdk",
  transports: ["stdio", "sse", "streamable-http"],
  defaultTrust: "disabled",
  sensitiveToolApproval: "required",
};
