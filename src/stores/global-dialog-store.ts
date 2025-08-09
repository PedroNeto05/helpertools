import { create } from 'zustand';

type GlobalDialogStore = {
  isOpen: boolean;
  title: string;
  description: string;
  type: 'warn' | 'error' | 'info' | 'success';
  resolve?: (result: boolean) => void;
  open: (opts: {
    title: string;
    description: string;
    type: GlobalDialogStore['type'];
  }) => Promise<boolean>;
  close: (result: boolean) => void;
};

export const useGlobalDialogStore = create<GlobalDialogStore>((set, get) => ({
  isOpen: false,
  title: '',
  description: '',
  type: 'info',
  open: (opts) =>
    new Promise((resolve) => {
      set({ ...opts, isOpen: true, resolve });
    }),
  close: (result) => {
    const resolve = get().resolve;
    if (resolve) resolve(result);
    set({ isOpen: false, resolve: undefined });
  },
}));
