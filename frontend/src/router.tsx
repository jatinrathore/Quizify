import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import QuizPage from "./pages/QuizPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <AccountManagePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <LearningPage />,
      },
    ],
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
