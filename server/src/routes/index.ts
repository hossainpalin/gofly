import UserRoutes from "./user.routes";
import CaptainRoutes from "./captain.routes";

export const routers = [
  { path: "/users", route: UserRoutes },
  { path: "/captains", route: CaptainRoutes }
];
