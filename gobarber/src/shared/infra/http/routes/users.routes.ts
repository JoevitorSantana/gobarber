import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from '../../../../config/upload'
import { CreateUserController } from "../../../../modules/users/services/CreateUsersUseCase/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/users/services/UpdateUserAvatarUseCase/UpdateUserAvatarController";

const usersRoutes = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updadeUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.create);

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), updadeUserAvatarController.update);

export {usersRoutes}