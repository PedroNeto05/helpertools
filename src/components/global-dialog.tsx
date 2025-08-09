import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import clsx from 'clsx';

interface GlobalDialogProps {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
  title: string;
  description: string;
  type: 'info' | 'warn' | 'error' | 'success';
}

export function GlobalDialog({
  isOpen,
  onClose,
  title,
  description,
  type,
}: GlobalDialogProps) {
  const titleColor = clsx({
    'text-blue-600': type === 'info',
    'text-yellow-600': type === 'warn',
    'text-red-700': type === 'error',
    'text-green-600': type === 'success',
  });

  const buttonVariant: 'default' | 'destructive' | 'secondary' | 'ghost' =
    type === 'info'
      ? 'default'
      : type === 'warn'
        ? 'secondary'
        : type === 'error'
          ? 'destructive'
          : 'ghost';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={titleColor}>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={buttonVariant}>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
