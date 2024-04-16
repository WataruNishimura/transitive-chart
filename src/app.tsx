import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import "./reset.css";

// QueryClientを初期化
const queryClient = new QueryClient();

// Viteビルド時に生成されるrouteTree.gen.tsをインポート
import { routeTree } from "./routeTree.gen";

// Routerインスタンスを作成
const router = createRouter<typeof routeTree>({
  routeTree,
  context: {
    queryClient,
  },
});

// RouterProviderにrouterを渡すための型拡張
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// React全体のエンドポイント
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
