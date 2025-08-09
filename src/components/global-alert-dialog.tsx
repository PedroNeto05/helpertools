import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import clsx from 'clsx';

interface GlobalAlertDialogProps {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
  title: string;
  description: string;
  type: 'warn' | 'error';
}

function getConfirmButtonVariant(
  type: 'warn' | 'error'
): 'default' | 'destructive' | 'secondary' | 'ghost' {
  switch (type) {
    case 'warn':
      return 'default';
    case 'error':
      return 'destructive';
    default:
      return 'default'; // Fallback, should not happen
  }
}

export function GlobalAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  type,
}: GlobalAlertDialogProps) {
  const titleColor = clsx({
    'text-yellow-600': type === 'warn',
    'text-red-700': type === 'error',
  });

  const confirmVariant = getConfirmButtonVariant(type);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={titleColor}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => onClose(false)}>
            Cancelar
          </Button>
          <Button variant={confirmVariant} onClick={() => onClose(true)}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
