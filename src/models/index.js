import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import todoModel from "./todo.model.js";

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    null,
    null,
    {
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true,
                trustedConnection: true,
                enableArithAbort: true
            }
        },
        host: 'Billy\\MSSQLSERVER',
        logging: false
    }
)

const db = {}

db.sequelize = sequelize;

// Modèles
db.User = userModel(sequelize);
db.Todo = todoModel(sequelize);

// Relations
// Un User a plusieurs Todos (One to Many)
db.User.hasMany(db.Todo, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

db.Todo.belongsTo(db.User, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default db;