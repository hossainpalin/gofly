import DeviceIcon from "@/assets/icons/device.svg";
import CaptainDashboard from "@/pages/captain-dashboard.tsx";
import CaptainPrivateRoute from "@/routes/captain-private-route.tsx";
import CaptainPublicRoute from "@/routes/captain-public-route.tsx";
import UserPrivateRoute from "@/routes/user-private-route.tsx";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/captain-login";
import CaptainSignup from "./pages/captain-signup";
import Home from "./pages/home";
import UserDashboard from "./pages/user-dashboard.tsx";
import UserLogin from "./pages/user-login";
import UserSignup from "./pages/user-signup";
import UserPublicRoute from "./routes/user-public-route.tsx";
import Trip from "@/pages/trip.tsx";

export default function App() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, [innerWidth]);

  if (innerWidth <= 768) {
    return (
      <div className="size-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user-login"
            element={<UserPublicRoute Component={UserLogin} />}
          />
          <Route
            path="/user-signup"
            element={<UserPublicRoute Component={UserSignup} />}
          />
          <Route
            path="/captain-login"
            element={<CaptainPublicRoute Component={CaptainLogin} />}
          />
          <Route
            path="/captain-signup"
            element={<CaptainPublicRoute Component={CaptainSignup} />}
          />
          <Route
            path="/user-dashboard"
            element={<UserPrivateRoute Component={UserDashboard} />}
          />
          <Route path="/trip" element={<UserPrivateRoute Component={Trip} />} />
          <Route
            path="/captain-dashboard"
            element={<CaptainPrivateRoute Component={CaptainDashboard} />}
          />

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="grid size-full place-items-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="flex w-full flex-col items-center">
          <img src={DeviceIcon} alt="device" className="w-[350px]" />
          <h1 className="mt-6 text-center text-3xl font-semibold text-slate-300">
            Please view this app on a mobile device <br /> for the best
            experience
          </h1>
        </div>
      </div>
    );
  }
}
