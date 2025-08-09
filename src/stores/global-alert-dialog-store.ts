import { create } from 'zustand';

type GlobalAlertDialogStore = {
  isOpen: boolean;
  title: string;
  description: string;
  type: 'warn' | 'error';
  resolve?: (result: boolean) => void;
  open: (opts: {
    title: string;
    description: string;
    type: GlobalAlertDialogStore['type'];
  }) => Promise<boolean>;
  close: (result: boolean) => void;
};

export const useGlobalAlertDialogStore = create<GlobalAlertDialogStore>(
  (set, get) => ({
    isOpen: false,
    title: '',
    description: '',
    type: 'warn',
    open: (opts) =>
      new Promise((resolve) => {
        set({ ...opts, isOpen: true, resolve });
      }),
    close: (result) => {
      const resolve = get().resolve;
      if (resolve) resolve(result);
      set({ isOpen: false, resolve: undefined });
    },
  })
);
