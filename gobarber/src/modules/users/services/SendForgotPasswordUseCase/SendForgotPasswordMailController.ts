import e, { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordEmailService } from "./SendForgotPasswordEmailService";

class SendForgotPasswordMailController {
    public async create(request: Request, response: Response):Promise<Response>{
        const {email} = request.body;

        const sendForgotMailService = container.resolve(SendForgotPasswordEmailService);

        await sendForgotMailService.execute({
            email
        })

        return response.status(204).send();
    }
}

export {SendForgotPasswordMailController}