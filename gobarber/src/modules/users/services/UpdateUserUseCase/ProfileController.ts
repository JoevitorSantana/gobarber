import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProfileService } from "../ShowProfileUseCase/ShowProfileService";
import { UpdateUserService } from "./UpdateUserService";

class ProfileController{

    public async update(request: Request, response:Response):Promise<Response>{
        const user_id = request.user.id;
        const {name, email, password, old_password} = request.body;

        const updateUser = container.resolve(UpdateUserService);

        const user = await updateUser.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        })

        return response.status(204).json(classToClass(user))
    }

    public async show(request: Request, response:Response):Promise<Response>{
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({
            user_id
        })

        return response.status(200).json(classToClass(user));
    }
}

export {ProfileController}