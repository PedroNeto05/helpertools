import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download } from 'lucide-react';
import { VideoCard } from './video-card';
import { Button } from '@/components/ui/button';

export function VideoDownloadQueue() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <Download />
          <p>Fila de Download</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex-1 space-y-4 overflow-y-auto">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        {videoQueue.map((_, idx) => (
          <VideoCard key={idx} />
        ))}
      </CardContent>
      <CardFooter className="border-border border-t p-4">
        <Button className="flex w-full items-center text-lg">
          <Download className="size-6" />
          <p>Baixar Fila</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
