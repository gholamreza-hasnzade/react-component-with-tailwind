import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppConfigurations } from "./configurations/app.configurations.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppConfigurations>
      <App />
    </AppConfigurations>
  </StrictMode>
);
