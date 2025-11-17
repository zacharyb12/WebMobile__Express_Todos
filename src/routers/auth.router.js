import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import { authorizeMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route('/login')
    .post(AuthController.login);

authRouter.route('/register')
    .post(AuthController.register);

authRouter.route('/updatePassword')
    .put(authorizeMiddleware(), AuthController.updatePassword);

    // creer une route user et un controller user pour updateUser et getUser
authRouter.route('/updateUser/:id')
    .put(authorizeMiddleware(), AuthController.updateUser);

authRouter.route('/user/:id')
    .get(authorizeMiddleware(), AuthController.getUser);

export default authRouter;