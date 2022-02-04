import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./CreateUserService";

class CreateUserController{

    public async create(request: Request, response: Response):Promise<Response>{
        const {name, email, password} = request.body;   

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({
            name, email, password
        });        

        return response.status(200).send();
    }
}

export{CreateUserController}