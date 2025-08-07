import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-full flex-col p-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
