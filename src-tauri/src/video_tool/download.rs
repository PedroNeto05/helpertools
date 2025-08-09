use tauri_plugin_shell::ShellExt;

#[tauri::command]
pub async fn validate_video_url(app: tauri::AppHandle, url: String) -> Result<bool, String> {
    let validate_bin = app.shell().sidecar("validate_url").unwrap().arg(url);
    let status = validate_bin.status().await.map_err(|e| e.to_string())?;
    if status.success() {
        return Ok(true);
    }
    Ok(false)
}
