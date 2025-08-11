import { createFileRoute } from '@tanstack/react-router';
import { VideoDownloadQueue } from './-components/video-download-queue';
import { VideoDownloadSettings } from './-components/video-download-settings';
import { InputUrl } from './-components/input-url';
import { VideoPreview } from './-components/video-preview';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/core';
import { useGlobalDialogStore } from '@/stores/global-dialog-store';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export interface VideoMetadata {
  title?: string;
  description?: string;
  uploader?: string;
  duration?: number;
  thumbnail?: string;
  formats: VideoFormat[];
}

export interface VideoFormat {
  format_id?: string;
  ext?: string;
  tbr?: string;
  height?: string;
  fps?: string;
  file_size?: number;
}

export const Route = createFileRoute('/videos/download/')({
  component: Download,
});

export const InputUrlformSchema = z.object({
  videoUrl: z.url(),
});


function Download() {
  const openDialog = useGlobalDialogStore((s) => s.open);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata>();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof InputUrlformSchema>) => {
      const isValidUrl = await invoke<boolean>('validate_video_url', {
        url: values.videoUrl,
      });

      if (!isValidUrl) {
        await openDialog({
          title: 'URL inválida',
          description: 'A URL do vídeo não é válida.',
          type: 'error',
        });
        return;
      }

      const videoMetadata = await invoke<VideoMetadata>("get_video_metadata", {
        url: values.videoUrl,
      });

      setVideoMetadata(videoMetadata);
    },
    onError: async (erro) => {
      console.log(erro);
      await openDialog({
        title: 'Erro',
        description:
          'Ocorreu um erro ao validar a URL. Tente novamente mais tarde.',
        type: 'error',
      });
    },
  });

  const InputUrlForm = useForm<z.infer<typeof InputUrlformSchema>>({
    resolver: zodResolver(InputUrlformSchema),
    defaultValues: {
      videoUrl: '',
    },
  });

  return (
    <div className="flex h-full space-x-4">
      <div className="flex flex-1 flex-col space-y-4">
        <InputUrl
          form={InputUrlForm}
          onSubmit={mutation.mutate}
          isLoading={mutation.isPending}
        />
        <VideoPreview title={videoMetadata?.title} description={videoMetadata?.description} thumbnailUrl={videoMetadata?.thumbnail} />
        <VideoDownloadSettings />
      </div>
      <div className="h-full flex-1">
        <VideoDownloadQueue />
      </div>
    </div>
  );
}
