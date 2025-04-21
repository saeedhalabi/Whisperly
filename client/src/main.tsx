import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ChatProvider from "./context/ChatProvider.tsx";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChatProvider>
    </BrowserRouter>
  </StrictMode>
);
