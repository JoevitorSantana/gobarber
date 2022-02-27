import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from '../../../../config/upload'
import { CreateUserController } from "../../../../modules/users/services/CreateUsersUseCase/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/users/services/UpdateUserAvatarUseCase/UpdateUserAvatarController";
import { celebrate, Joi, Segments } from "celebrate";

const usersRoutes = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updadeUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
}), createUserController.create);

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), updadeUserAvatarController.update);

export {usersRoutes}