import db from "../models/index.js";

const userService = {
    async createUser(username, email, passwordHash) {
        return db.User.create({ username, email, password: passwordHash });
    },
    async getUserByEmail(email) {
        return db.User.findOne({ where: { email } });
    },
    async getUserById(id) {
        return db.User.findByPk(id);
    },
    async updateUser(id, updates) {
        const user = await db.User.findByPk(id);
        if (!user) {
            return null;
        }
        return user.update(updates);
    }
};

export default userService;