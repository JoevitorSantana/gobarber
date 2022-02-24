import { Router } from "express";
import { ProfileController } from "../../../../modules/users/services/UpdateUserUseCase/ProfileController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const profileRoutes = Router();

const updateProfile = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/update', updateProfile.update);
profileRoutes.get('/', updateProfile.show);

export {profileRoutes}