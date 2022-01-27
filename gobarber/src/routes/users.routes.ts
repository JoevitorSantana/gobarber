import { Router } from "express";
import { CreateUserService } from "../services/CreateUserService";

const usersRoutes = Router();

usersRoutes.post("/", async (request, response) => {
    try {
        const {name, email, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name, email, password
        });        

        return response.status(200).send();

    } catch(err) {
        return response.status(400).json({error: (err as Error).message});
    }
})

export {usersRoutes}