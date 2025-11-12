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

export default authRouter;