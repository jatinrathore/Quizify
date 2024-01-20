import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { AuthContextWrapper } from "./hooks/useAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <AuthContextWrapper>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        rtl={false}
        theme="colored"
        toastStyle={{ backgroundColor: "#9ADE7B" }}
      />
    </AuthContextWrapper>
  </ChakraProvider>
);
