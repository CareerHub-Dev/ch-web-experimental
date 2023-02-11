import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { SessionContextProvider } from "./context/SessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <RouterProvider router={router} />
      </SessionContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
