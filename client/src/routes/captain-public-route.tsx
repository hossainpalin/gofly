import { Navigate } from "react-router-dom";
import useCaptain from "@/hooks/use-captain.ts";

export default function CaptainPublicRoute({
  Component
}: {
  Component: () => JSX.Element;
}) {
  const { captain } = useCaptain();

  if (!captain) {
    return <Component />;
  }

  if (
    location.pathname === "/captain-login" ||
    location.pathname === "/captain-signup"
  ) {
    return <Navigate to="/captain-dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
}
