import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProviderMonthAvailabilityService } from "./ListProviderMonthAvailabilityService";

class ListProviderMonthAvailabilityController{
    public async index(request:Request, response:Response):Promise<Response>{
        const {provider_id} = request.params;
        const { month, year} = request.body;
    
        const listMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
    
        const availability = await listMonthAvailability.execute({
            provider_id, month, year
        });
    
        return response.json(availability);
    }
}

export{ListProviderMonthAvailabilityController}