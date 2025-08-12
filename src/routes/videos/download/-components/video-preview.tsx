import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoPreviewProps {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
}

export const VideoPreview = ({ title, description, thumbnailUrl }: VideoPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="size-5" />
          <p>Preview do Vídeo</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Video Preview"
            className="max-h-32 w-64 rounded-md"
            height={192}
            width={320}
          />
        )}
        <div className="h-full flex-1 flex-col space-y-2">
          <h3 className="text-foreground line-clamp-2 text-lg font-semibold">
            {title}
          </h3>
          <div className="min-h-0 flex-1">
            <p className="text-muted-foreground line-clamp-6 text-sm">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
