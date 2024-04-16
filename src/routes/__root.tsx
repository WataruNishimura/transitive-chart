import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";
import { styled } from "styled-components";

const Header = styled.header`
  padding: 1rem 20px;
  width: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
`;

const HeaderNavigationMenu = styled.ul`
  display: flex;

  gap: 1rem;
`;

const HeaderNavigationMenuItem = styled.li`
  list-style: none;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    padding: 4px 8px;
    transition: all 0.2s;
    border-radius: 4px;
    &:hover {
      background-color: #ddd;
    }
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;

const MinHeightWrapper = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
`;

const TopLoading = styled.div`
  width: 100%;
  height: 100dvh;
  display: grid;
  place-items: center;
`;

export const Route = createRootRoute({
  component: () => (
    <MinHeightWrapper>
      <Header>
        <HeaderTitle>Transitive Graph</HeaderTitle>
        <nav>
          <HeaderNavigationMenu>
            <HeaderNavigationMenuItem>
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </HeaderNavigationMenuItem>
          </HeaderNavigationMenu>
        </nav>
      </Header>
      <hr />
      <Suspense fallback={<TopLoading>Loading...</TopLoading>}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <TanStackRouterDevtools />
    </MinHeightWrapper>
  ),
});
