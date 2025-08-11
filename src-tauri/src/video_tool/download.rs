use serde::{Deserialize, Serialize};
use tauri_plugin_shell::ShellExt;

#[derive(Deserialize, Serialize)]
pub struct VideoMetadata {
    title: Option<String>,
    description: Option<String>,
    uploader: Option<String>,
    duration: Option<u32>,
    thumbnail: Option<String>,
    formats: Vec<VideoFormat>,
}

#[derive(Deserialize, Serialize)]
pub struct VideoFormat {
    format_id: String,
    ext: Option<String>,
    tbr: Option<String>,
    height: Option<String>,
    fps: Option<String>,
    file_size: Option<u64>,
}

#[tauri::command]
pub async fn validate_video_url(app: tauri::AppHandle, url: String) -> Result<bool, String> {
    let validate_bin = app.shell().sidecar("validate_url").unwrap().arg(url);
    let status = validate_bin.status().await.map_err(|e| e.to_string())?;
    if status.success() {
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
pub async fn get_video_metadata(
    app: tauri::AppHandle,
    url: String,
) -> Result<VideoMetadata, String> {
    println!("{}", url);
    let metadata_bin = app.shell().sidecar("get_video_metadata").unwrap().arg(url);
    let output = metadata_bin.output().await.map_err(|e| e.to_string())?;

    if output.status.success() {
        let metadata = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        let json_metadata: VideoMetadata =
            serde_json::from_str(&metadata).map_err(|e| e.to_string())?;
        return Ok(json_metadata);
    }

    Err(String::from_utf8(output.stderr).unwrap_or_else(|_| "Failed to get metadata".to_string()))
}
