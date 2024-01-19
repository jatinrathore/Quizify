import { createBrowserRouter } from "react-router-dom";
import AccountManagePage from "./pages/AccountManagePage";

const router = createBrowserRouter([
  {
    path: "",
    element: <AccountManagePage />,
  },
]);

export default router;
