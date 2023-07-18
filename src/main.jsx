import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
