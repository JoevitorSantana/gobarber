import { celebrate, Joi, Segments } from "celebrate";
import { response, Router } from "express";
import { UsersRepository } from "../../../../modules/users/infra/typeorm/repositories/UsersRepository";
import { AuthenticationController } from "../../../../modules/users/services/AuthenticationUseCase/AuthenticationController";
import { AuthenticationService } from "../../../../modules/users/services/AuthenticationUseCase/AuthenticationService";

const sessionsRoutes = Router();

const authenticationController = new AuthenticationController();

sessionsRoutes.post("/", celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
}), authenticationController.create);

export {sessionsRoutes}