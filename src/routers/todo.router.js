import TodoController from "../controllers/todo.controller.js";
import { authorizeMiddleware } from "../middlewares/auth.middleware.js";

import Router from "express";

const todoRouter = Router();

todoRouter.route('/all/:id')
    .get(authorizeMiddleware(),TodoController.getTodos);

todoRouter.route('/details/:id')
    .get(authorizeMiddleware(),TodoController.getTodoById);

todoRouter.route('/update/:id')
    .put(authorizeMiddleware(),TodoController.updateTodo);

todoRouter.route('/delete/:id')
    .delete(authorizeMiddleware(),TodoController.deleteTodo);

todoRouter.route('/')
    .post(authorizeMiddleware(),TodoController.createTodo);

export default todoRouter;