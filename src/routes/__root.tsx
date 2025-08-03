import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
