import { createFileRoute } from '@tanstack/react-router';
import { InputUrl } from '@/routes/videos/download/-components/input-url.tsx';

export const Route = createFileRoute('/videos/download/')({
  component: Download,
});

function Download() {
  return (
    <div>
      <InputUrl />
    </div>
  );
}
