import { routers } from "@/routers";
import { Application } from "express";

export const configureRoutes = (app: Application) => {
  routers.forEach((apiRoute) => {
    const { path, route } = apiRoute;
    const endpoint = `/api/v1${path}`;

    app.use(endpoint, route);
  });
};
