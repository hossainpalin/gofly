import { Navigate } from "react-router-dom";
import useCaptain from "@/hooks/use-captain.ts";

export default function CaptainPrivateRoute({
  Component
}: {
  Component: () => JSX.Element;
}) {
  const { captain } = useCaptain();

  if (!captain) {
    return <Navigate to="/captain-login" replace />;
  }

  return <Component />;
}
