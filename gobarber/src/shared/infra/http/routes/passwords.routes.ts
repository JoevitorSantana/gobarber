import { Router } from "express";
import { ResetPasswordController } from "../../../../modules/users/services/ResetPasswordUseCase/ResetPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/users/services/SendForgotPasswordUseCase/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.create);
passwordRoutes.post("/reset", resetPasswordController.create);

export {passwordRoutes}