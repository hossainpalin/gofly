import useUser from "@/hooks/use-user";
import { Navigate } from "react-router-dom";

export default function UserPrivateRoute({
  Component
}: {
  Component: () => JSX.Element;
}) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/user-login" replace />;
  }

  return <Component />;
}
