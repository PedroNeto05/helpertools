import { createFileRoute } from '@tanstack/react-router';
import { VideoDownloadQueue } from './-components/video-download-queue';
import { VideoDownloadSettings } from './-components/video-download-settings';
import { InputUrl } from './-components/input-url';
import { VideoPreview } from './-components/video-preview';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/core';
export const Route = createFileRoute('/videos/download/')({
  component: Download,
});

export const InputUrlformSchema = z.object({
  videoUrl: z.url(),
});

function InputUrlOnSubmit(values: z.infer<typeof InputUrlformSchema>) {
}

function Download() {
  const InputUrlForm = useForm<z.infer<typeof InputUrlformSchema>>({
    resolver: zodResolver(InputUrlformSchema),
    defaultValues: {
      videoUrl: '',
    },
  });

  return (
    <div className="flex h-full space-x-4">
      <div className="flex flex-1 flex-col space-y-4">
        <InputUrl form={InputUrlForm} onSubmit={InputUrlOnSubmit} />
        <VideoPreview />
        <VideoDownloadSettings />
      </div>
      <div className="h-full flex-1">
        <VideoDownloadQueue />
      </div>
    </div>
  );
}
