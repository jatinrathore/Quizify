import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";

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
]);

export default router;
