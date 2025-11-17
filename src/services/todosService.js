import db from "../models/index.js";

const todoService = {
    async createTodo(userId, title, description) {
        return db.Todo.create({ userId, title, description });
    },
    async getTodosByUserId(userId) {
        return db.Todo.findAll({ where: { userId } });
    },
    async getTodoById(id) {
        return db.Todo.findByPk(id);
    },
    async updateTodo(id, updates) {
        const todo = await db.Todo.findByPk(id);
        if (!todo) {
            return null;
        }
        return todo.update(updates);
    },
    async deleteTodo(id) {
        const todo = await db.Todo.findByPk(id);
        if (!todo) {
            return null;
        }
        await todo.destroy();
        return todo;
    }
};

export default todoService;