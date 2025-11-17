import todoService from "../services/todosService.js";


const TodoController = {
    getTodos: async (req, res) => {
        const userId = parseInt(req.params.id,10);
        
        const userTodos = await todoService.getTodosByUserId(userId);
        res.status(200);
        res.json(userTodos);

    },
    getTodoById: async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const todo = await todoService.getTodoById(id);
        if (!todo) {
            res.sendStatus(404);
            return;
        }
        res.status(200);
        res.json(todo);
    },
    createTodo: async (req, res) => {
        const {title, description, userId} = req.body;
        const todo = await todoService.createTodo(userId, title, description);
        res.status(201);
        res.json(todo);
    },
    updateTodo: async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const {title, description, isCompleted} = req.body;
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (isCompleted !== undefined) updates.isCompleted = isCompleted;
        
        const todo = await todoService.updateTodo(id, updates);
        if (!todo) {
            res.sendStatus(404);
            return;
        }
        res.status(200);
        res.json(todo);
    },
    deleteTodo: async (req, res) => {

        const id = parseInt(req.params.id);

        await todoService.deleteTodo(id);

        res.sendStatus(204);
    }
};

export default TodoController;