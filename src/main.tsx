import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "toastify-js/src/toastify.css";
import { BrowserRouter } from "react-router-dom";
import { DirectionProvider } from "./utils/direction-context.tsx";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DirectionProvider>
  </StrictMode>
);
