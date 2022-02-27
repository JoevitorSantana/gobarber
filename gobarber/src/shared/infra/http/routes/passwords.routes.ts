import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ResetPasswordController } from "../../../../modules/users/services/ResetPasswordUseCase/ResetPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/users/services/SendForgotPasswordUseCase/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required()
    }
}), sendForgotPasswordMailController.create);


passwordRoutes.post("/reset", celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
}), resetPasswordController.create);

export {passwordRoutes}