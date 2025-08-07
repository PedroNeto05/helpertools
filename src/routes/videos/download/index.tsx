import { createFileRoute } from '@tanstack/react-router';
import { VideoDownloadQueue } from './-components/video-download-queue';
import { VideoDownloadSettings } from './-components/video-download-settings';
import { InputUrl } from './-components/input-url';

export const Route = createFileRoute('/videos/download/')({
  component: Download,
});

function Download() {
  return (
    <div className="flex h-full space-x-4">
      <div className="flex flex-1 flex-col space-y-4">
        <InputUrl />
        <VideoDownloadSettings />
      </div>
      <div className="min-h-0 flex-1">
        <VideoDownloadQueue />
      </div>
    </div>
  );
}
