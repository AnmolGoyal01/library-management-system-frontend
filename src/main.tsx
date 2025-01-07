import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddBookPage,
  HomePage,
  LoginPage,
  SignupPage,
  BorrowReturnPage,
  DashboardPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute authentication={false}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute authentication={false}>
            <SignupPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <ProtectedRoute authentication={true}>
            <AddBookPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "borrow-return",
        element: (
          <ProtectedRoute authentication={true}>
            <BorrowReturnPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute authentication={true}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
