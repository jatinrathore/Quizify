import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";
import HomePage from "./pages/HomePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import QuizPage from "./pages/QuizPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <DashboardPage />,
  },
  {
    path: "/account-manage",
    element: <AccountManagePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/verify-email/:id",
    element: <VerifyEmailPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
]);

export default router;
