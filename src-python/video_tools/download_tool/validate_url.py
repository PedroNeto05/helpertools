from yt_dlp import YoutubeDL
from sys import argv, exit

class SilentLogger:
    def debug(self, msg): pass
    def info(self, msg): pass
    def warning(self, msg): pass
    def error(self, msg): pass

def validate_url(url: str) -> bool:
    options = {
        'quiet': True,
        'no_warnings': True,
        'noprogress': True,
        'logger': SilentLogger(),
    }
    try:
        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=False)
        return info is not None
    except Exception:
        return False

if __name__ == "__main__":
    if len(argv) < 2 or not argv[1].strip():
        exit(1)

    url = argv[1].strip()
    exit(0 if validate_url(url) else 1)
