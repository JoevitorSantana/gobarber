import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAppointmentService } from "./CreateAppointmentService";

export class CreateAppointmentController {
    public async create(request: Request, response:Response):Promise<Response>{
        const user_id = request.user.id;   
        const {provider_id, date} = request.body;
               
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date,
            user_id,
            provider_id,
        });

        return response.json(appointment);
    }
}