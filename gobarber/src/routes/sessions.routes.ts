import { response, Router } from "express";
import { AuthenticationService } from "../services/AuthenticationService";

const sessionsRoutes = Router();

sessionsRoutes.post("/", async (request, response) => {    
        const {email, password} = request.body

        const authenticateService = new AuthenticationService();

        const { user, token } = await authenticateService.execute({
            email, password
        })

        return response.json({user, token});
    
})

export {sessionsRoutes}