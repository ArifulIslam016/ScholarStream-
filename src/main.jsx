import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Contexts/AuthContext/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const quariClient=new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={quariClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
