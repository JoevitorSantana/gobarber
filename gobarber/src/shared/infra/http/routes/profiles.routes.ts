import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ProfileController } from "../../../../modules/users/services/UpdateUserUseCase/ProfileController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const profileRoutes = Router();

const updateProfile = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/update', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
}), updateProfile.update);

profileRoutes.get('/', updateProfile.show);

export {profileRoutes}