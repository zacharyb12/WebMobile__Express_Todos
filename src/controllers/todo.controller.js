let todos = [
    {
        id: 1,
        userId : 1,
        title: "Acheter du pain",
        description : "Aller à la boulangerie du coin",
        completed: false

    },
    {
        id: 2,
        userId : 1,
        title: "Acheter du lait",
        description : "Prendre du lait demi-écrémé",
        completed: false
    },
    {
        id: 3,
        userId : 2,
        title: "Acheter des oeufs",
        description : "Prendre une douzaine d'oeufs",
        completed: false
    }
];

let nextId = todos.length + 1;


const TodoController = {
    getTodos: async (req, res) => {
        const userId = parseInt(req.params.id,10);
        
        const userTodos = todos.filter(t => t.userId === userId);
        res.status(200);
        res.json(userTodos);

    },
    getTodoById: async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            res.sendStatus(404);
            return;
        }
        res.status(200);
        res.json(todo);
    },
    createTodo: async (req, res) => {
        const {title, description, completed,userId} = req.body;
        const todo = {
            id: nextId,
            userId: userId,
            title: title,
            description: description || "",
            completed: completed || false
        };
        nextId++;
        todos.push(todo);
        res.status(201);
        res.json(todo);
    },
    updateTodo: async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            res.sendStatus(404);
            return;
        }
        const {title, description, completed} = req.body;
        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        todo.completed = completed ?? todo.completed;
        res.status(200);
        res.json(todo);
    },
    deleteTodo: async (req, res) => {

        const id = parseInt(req.params.id);

        todos = todos.filter(t => t.id !== id);

        res.sendStatus(204);
    }
};

export default TodoController;