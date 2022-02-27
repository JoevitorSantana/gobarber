import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProviderAppointmentService } from "./ListProviderAppointmentService";

class ProviderAppointmentsController{

    public async index(request:Request, response:Response):Promise<Response>{
        const provider_id = request.user.id;

        const {day, month, year} = request.body;

        const listProviderAppointments = container.resolve(ListProviderAppointmentService);

        const appointments = listProviderAppointments.execute({
            provider_id, day, month, year
        })

        return response.json(appointments);
    }
}

export {ProviderAppointmentsController}