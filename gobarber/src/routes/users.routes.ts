import { request, Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserService } from "../services/CreateUserService";
import uploadConfig from '../config/upload'
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";

const usersRoutes = Router();

const upload = multer(uploadConfig);

usersRoutes.post("/", async (request, response) => {    
        const {name, email, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name, email, password
        });        

        return response.status(200).send();
    
});

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), async (request, response) => {    

        const updateUserAvatarService = new UpdateUserAvatarService();        

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName: request.file?.filename
        })

        return response.json(user);
    
})

export {usersRoutes}