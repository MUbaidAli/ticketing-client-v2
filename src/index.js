import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/Auth";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { CatProvider } from "./context/CatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CatProvider>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CatProvider>
);
