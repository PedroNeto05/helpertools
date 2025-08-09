import { GlobalAlertDialog } from '@/components/global-alert-dialog';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useGlobalAlertDialogStore } from '@/stores/global-alert-dialog-store';
import { GlobalDialog } from '@/components/global-dialog';
import { useGlobalDialogStore } from '@/stores/global-dialog-store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    const {
      isOpen: alertIsOpen,
      title: alertTitle,
      description: alertDescription,
      type: alertType,
      close: alertClose,
    } = useGlobalAlertDialogStore();

    const {
      isOpen: dialogIsOpen,
      title: dialogTitle,
      description: dialogDescription,
      type: dialogType,
      close: dialogClose,
    } = useGlobalDialogStore();

    return (
      <QueryClientProvider client={queryClient}>
        <GlobalAlertDialog
          isOpen={alertIsOpen}
          onClose={alertClose}
          title={alertTitle}
          description={alertDescription}
          type={alertType}
        />

        <GlobalDialog
          isOpen={dialogIsOpen}
          onClose={dialogClose}
          title={dialogTitle}
          description={dialogDescription}
          type={dialogType}
        />

        {/* Uncomment the following line to include a global toast component */}
        {/* <GlobalToast /> */}

        {/* Uncomment the following line to include a global modal component */}
        {/* <GlobalModal /> */}

        {/* Uncomment the following line to include a global sidebar component */}
        {/* <GlobalSidebar /> */}

        <div className="flex h-full flex-col p-12">
          <Outlet />
        </div>

        <TanStackRouterDevtools />
      </QueryClientProvider>
    );
  },
});
