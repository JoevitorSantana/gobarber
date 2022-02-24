import { Router } from "express";
import { appointmentsRouter } from "./appointments.routes";
import { passwordRoutes } from "./passwords.routes";
import { profileRoutes } from "./profiles.routes";
import { providerRoutes } from "./providers.routes";
import { sessionsRoutes } from "./sessions.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/password", passwordRoutes);
routes.use("/profile", profileRoutes);
routes.use("/providers", providerRoutes);

export {routes}