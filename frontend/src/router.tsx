import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

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
]);

export default router;
