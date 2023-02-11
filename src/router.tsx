import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import CommonLayot from "./components/layout/CommonLayout";

const LandingPage = lazy(() => import("@/pages/Landing"));
const LoginPage = lazy(() => import("@/pages/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayot />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
