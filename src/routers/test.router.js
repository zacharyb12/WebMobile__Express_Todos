import testController from "../controllers/test.controller.js";
import { authorizeMiddleware } from "../middlewares/auth.middleware.js";

import Router from "express";

const testRouter = Router();

testRouter.route('/')
    .get(testController.getPublic);

testRouter.route('/visitor')
    .get(authorizeMiddleware("Visitor"),testController.getVisitor);

testRouter.route('/admin')
    .get(authorizeMiddleware("Admin"),testController.getAdmin);

export default testRouter;