import json
from sys import argv, exit
from yt_dlp import YoutubeDL

class SilentLogger:
    def debug(self, msg):   pass
    def info(self, msg):    pass
    def warning(self, msg): pass
    def error(self, msg):   pass

def get_video_info(url: str):
    options = {
            'quiet': True,
            'no_warnings': True,
            'logger': SilentLogger(),
            'noprogress': True,
            }
    with YoutubeDL(options) as ydl:
        info = ydl.extract_info(url, download=False)
    return info

if __name__ == "__main__":
    url = argv[1] if len(argv) > 1 else None
    if not url:
        exit(1)

    try:
        info = get_video_info(url)
        if not info:
            exit(1)
    

        duration = info.get("duration")
        result = {
                "title": info.get("title"),
                "description": info.get("description"),
                "uploader": info.get("uploader"),
                "duration": duration ,
                "thumbnail": info.get("thumbnail"),
                "formats": []
                }

        allowed_qualities = [1080, 720, 480, 360, 240, 144]

        for f in info.get("formats", []):
            if f.get("height") not in allowed_qualities:
                continue
            tbr = f.get("tbr")
            result["formats"].append({
                "format_id": f.get("format_id"),
                "ext": f.get("ext"),
                "tbr": str(f.get("tbr", "")),
                "height": str(f.get("height", "")),
                "fps": str(int(f.get("fps", ""))),
                "file_size": int(tbr * 1000 / 8 * duration)
                })

        print(json.dumps(result, ensure_ascii=False))

    except Exception as e:
        exit(1)
