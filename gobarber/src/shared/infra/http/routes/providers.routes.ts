import { Router } from "express";
import { ListProvidersController } from "../../../../modules/users/services/ListProvidersUseCase/ListProvidersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const providerRoutes = Router();

const listProviders = new ListProvidersController()

providerRoutes.use(ensureAuthenticated);
providerRoutes.get('/', listProviders.index);

export {providerRoutes}