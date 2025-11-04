import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DirectionProvider } from "./utils/direction-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DirectionProvider>
  </StrictMode>
);
