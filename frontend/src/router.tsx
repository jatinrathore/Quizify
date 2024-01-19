import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "",
    element: <AccountManagePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

export default router;
