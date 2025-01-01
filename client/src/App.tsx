import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/captain-login";
import CaptainSignup from "./pages/captain-signup";
import Home from "./pages/home";
import UserLogin from "./pages/user-login";
import UserSignup from "./pages/user-signup";

export default function App() {
  return (
    <div className="size-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}
