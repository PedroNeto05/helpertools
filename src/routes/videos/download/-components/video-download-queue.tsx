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
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download />
          <p>Fila de Download</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </CardContent>
      <CardFooter className="border-border flex border-t p-4">
        <Button className="flex w-full items-center">
          <Download />
          <p>Baixar Tudo</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
