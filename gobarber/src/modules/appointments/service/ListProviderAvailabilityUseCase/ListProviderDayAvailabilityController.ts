import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProviderDayAvailabilityService } from "./ListProviderDayAvailabilityService";

class ListProviderDayAvailabilityController{
    
    public async index(request:Request, response:Response):Promise<Response>{
        const {provider_id} = request.params;
        const { day, month, year} = request.query;

        const listDayAvailability = container.resolve(ListProviderDayAvailabilityService);

        const availability = await listDayAvailability.execute({
            provider_id, 
            day: Number(day), 
            month: Number(month), 
            year: Number(year)
        });

        return response.json(availability);
    }
}

export {ListProviderDayAvailabilityController}