import { string } from "@hapi/joi";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ListProviderDayAvailabilityController } from "../../../../modules/appointments/service/ListProviderAvailabilityUseCase/ListProviderDayAvailabilityController";
import { ListProviderMonthAvailabilityController } from "../../../../modules/appointments/service/ListProviderMonthAvailabilityUseCase/ListProviderMonthAvailabilityController";
import { ListProvidersController } from "../../../../modules/users/services/ListProvidersUseCase/ListProvidersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const providerRoutes = Router();

const listProviders = new ListProvidersController()
const providerMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ListProviderDayAvailabilityController();

providerRoutes.use(ensureAuthenticated);
providerRoutes.get('/', listProviders.index);
providerRoutes.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}), providerMonthAvailabilityController.index);
providerRoutes.get('/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}), providerDayAvailabilityController.index);

export {providerRoutes}