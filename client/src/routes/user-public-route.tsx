import useUser from "@/hooks/use-user";
import { Navigate, useLocation } from "react-router-dom";

export default function UserPublicRoute({
  Component
}: {
  Component: () => JSX.Element;
}) {
  const location = useLocation();
  const { user } = useUser();

  if (!user) {
    return <Component />;
  }

  if (
    location.pathname === "/user-login" ||
    location.pathname === "/user-signup"
  ) {
    return <Navigate to="/user-dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
}
