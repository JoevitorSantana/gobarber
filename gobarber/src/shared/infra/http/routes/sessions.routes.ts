import { response, Router } from "express";
import { UsersRepository } from "../../../../modules/users/infra/typeorm/repositories/UsersRepository";
import { AuthenticationController } from "../../../../modules/users/services/AuthenticationUseCase/AuthenticationController";
import { AuthenticationService } from "../../../../modules/users/services/AuthenticationUseCase/AuthenticationService";

const sessionsRoutes = Router();

const authenticationController = new AuthenticationController();

sessionsRoutes.post("/", authenticationController.create);

export {sessionsRoutes}