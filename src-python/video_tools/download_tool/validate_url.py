from yt_dlp import YoutubeDL
from sys import argv, exit

class SilentLogger:
    def debug(self, msg):   pass
    def info(self, msg):    pass
    def warning(self, msg): pass
    def error(self, msg):   pass

def validate_url(url: str) -> bool:
    options = {
        'ignoreerrors': True,
        'quiet': True,
        'no_warnings': True,
        'noprogress': True,
        'logger': SilentLogger(),
    }
    with YoutubeDL(options) as ydl:
        info = ydl.extract_info(url, download=False)
    return info is not None

if __name__ == "__main__":
    url = argv[1] if len(argv) > 1 else None
    if not url:
        exit(1)

    is_valid = validate_url(url)
    if is_valid:
        exit(0)
    else:
        exit(1)
