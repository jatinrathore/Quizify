import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        rtl={false}
        theme="colored"
        toastStyle={{ backgroundColor: "#9ADE7B" }}
      />
    </QueryClientProvider>
  </ChakraProvider>
);
