import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProviderAppointmentsController } from "../../../../modules/appointments/service/ListProviderAppointmentsUseCase/ProviderAppointmentsController";
import { CreateAppointmentController } from "../../../../modules/appointments/service/CreateAppointmentUseCase/CreateAppointmentController";
import { celebrate, Joi, Segments } from "celebrate";

const appointmentsRouter = Router();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

const createAppointment = new CreateAppointmentController();

appointmentsRouter.post("/", celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}), createAppointment.create);

appointmentsRouter.get('/me', providerAppointmentsController.index)

export {appointmentsRouter};