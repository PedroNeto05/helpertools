import { createFileRoute } from '@tanstack/react-router';
import { InputUrl } from '@/routes/videos/download/-components/input-url.tsx';
import { VideoDownloadSettings } from '@/routes/videos/download/-components/video-download-settings.tsx';

export const Route = createFileRoute('/videos/download/')({
  component: Download,
});

function Download() {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        <InputUrl />
        <VideoDownloadSettings />
      </div>
    </div>
  );
}
