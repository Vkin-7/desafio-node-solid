import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/:user_id/admin", turnUserAdminController.handle);

usersRoutes.get("/:user_id", showUserProfileController.handle);

usersRoutes.get("/", listAllUsersController.handle);

export { usersRoutes };
