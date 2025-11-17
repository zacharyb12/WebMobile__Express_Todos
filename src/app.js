import express from "express";
import cors from "cors";
import testRouter from "./routers/test.router.js";
import authRouter from "./routers/auth.router.js";
import { authentificationMiddleware } from './middlewares/auth.middleware.js';
import todoRouter from "./routers/todo.router.js";
import db from "./models/index.js";

const { NODE_ENV, PORT } = process.env;

const app = express();

// Connexion et migration des tables
db.sequelize.authenticate()
    .then(() => {
        console.log('✅ Connecté à SQL Server');
        return db.sequelize.sync({ alter: true });
    })
    .then(() => console.log('✅ Tables migrées'))
    .catch(err => console.error('❌ Erreur DB:', err.message));
app.use(cors());
app.use(express.json());
app.use(authentificationMiddleware());


app.use('/api/test',testRouter);
app.use('/api/auth',authRouter);
app.use('/api/todos',todoRouter);

app.listen(PORT, (error) => {
    if  (error) {
        console.error('Une erreur est survenue!');
        console.error(error);
        return;
    }
    console.log(`La WebAPI tourne sur le port ${PORT} en mode ${NODE_ENV}`);
})