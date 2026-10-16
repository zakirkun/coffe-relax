use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager, State};

#[derive(Default)]
struct AppState {
    profile_name: std::sync::Mutex<Option<String>>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct RuntimeInfo {
    app_name: &'static str,
    version: &'static str,
    local_only: bool,
    agent_runtime: &'static str,
}

#[tauri::command]
fn get_runtime_info() -> RuntimeInfo {
    RuntimeInfo {
        app_name: "Coffe",
        version: env!("CARGO_PKG_VERSION"),
        local_only: true,
        agent_runtime: "bundled-sidecar",
    }
}

#[tauri::command]
fn set_local_profile(name: String, state: State<'_, AppState>) -> Result<(), String> {
    let trimmed = name.trim();
    if trimmed.is_empty() {
        return Err("Profile name cannot be empty".to_string());
    }

    let mut profile_name = state
        .profile_name
        .lock()
        .map_err(|_| "Profile state is unavailable".to_string())?;
    *profile_name = Some(trimmed.to_string());
    Ok(())
}

#[tauri::command]
fn emit_agent_boundary_event(app: AppHandle, event_type: String) -> Result<(), String> {
    let allowed = matches!(event_type.as_str(), "agent-ready" | "agent-shutdown");
    if !allowed {
        return Err("Unsupported boundary event".to_string());
    }

    app.emit("agent-boundary", event_type)
        .map_err(|error| error.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            get_runtime_info,
            set_local_profile,
            emit_agent_boundary_event
        ])
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") {
                window.set_title("Coffe | Your IDE Agentic Coding")?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Coffe");
}
