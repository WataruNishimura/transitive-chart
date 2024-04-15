import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="p-2 flex gap-2">
        <nav>
          <ul>
            <li>
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
              </li>
          </ul>
        </nav>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})