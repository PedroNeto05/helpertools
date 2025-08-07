import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';

export const VideoPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="size-5" />
          <p>Video Preview</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <img
          src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          alt="Video Preview"
          className="h-52 w-96 rounded-md"
          height={192}
          width={320}
        />
        <div className="h-full flex-1 flex-col space-y-2">
          <h3 className="text-foreground line-clamp-2 text-lg font-semibold">
            Título do Vídeo - Uma Descrição Muito Longa Que Vai Ser Truncada Com
            Os Pontinhos Para Indicar Que Há Mais Conteúdo
          </h3>
          <div className="min-h-0 flex-1">
            <p className="text-muted-foreground line-clamp-6 text-sm">
              Esta é uma descrição muito longa do vídeo que será truncada com os
              pontinhos (...) quando exceder o espaço disponível. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              laboriosam soluta est perspiciatis, quo fugit doloribus doloremque
              unde harum obcaecati. Iste libero saepe ea at mollitia commodi
              incidunt, deserunt nesciunt.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
