import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationService } from "./AuthenticationService";

class AuthenticationController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body
        
        const authenticateService = container.resolve(AuthenticationService);

        const { user, token } = await authenticateService.execute({
            email, password
        })

        return response.json({user, token});
    }
}

export {AuthenticationController}