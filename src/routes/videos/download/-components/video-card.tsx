import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function VideoCard() {
  return (
    <Card>
      <CardHeader className="flex space-x-2">
        <img
          src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          alt="Video Thumbnail"
          className="h-24 w-32 rounded-md"
          height={64}
          width={64}
        />
        <div>
          <CardTitle>Título do vídeo</CardTitle>
          <CardDescription>Descrição do vídeo que será baixado</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>Progresso do download</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </CardContent>
    </Card>
  );
}
