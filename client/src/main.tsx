import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import UserProvider from "./providers/user-provider.tsx";
import CaptainProvider from "@/providers/captain-provider.tsx";
import TripAnimateProvider from "@/providers/trip-animate-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TripAnimateProvider>
      <CaptainProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </CaptainProvider>
    </TripAnimateProvider>
  </StrictMode>
);
