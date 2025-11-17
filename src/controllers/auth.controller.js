import argon2 from "argon2";
import { generateToken } from "../utils/jwt.utils.js";
import userService from "../services/userService.js";

const users = [
    {
        id: 1,
        username: "Bob",
        role: "Admin",
        email: "bob@mail.com",
        // Test1234=
        pwd: "$argon2id$v=19$m=65536,t=3,p=4$XftkiHfGq4BzCMu53hXcEA$Z+p7mh8XBc0FdBSQ1jL/46yCjic9mQ0qIkcH0SS/338"
    },
    {
        id: 2,
        username: "Dylan",
        role: "user",
        email: "dylan@mail.com",
        // Test1234=
        pwd: "$argon2id$v=19$m=65536,t=3,p=4$XftkiHfGq4BzCMu53hXcEA$Z+p7mh8XBc0FdBSQ1jL/46yCjic9mQ0qIkcH0SS/338"
    }
];
let nextId = 3;


const AuthController = {
    register: async (req, res) => {
        const {username, password, email} = req.body;
        const role = "Visitor";

        if (!email || !password) {
            res.status(400);
            res.json({error: "L'email et le mot de passe sont obligatoire"});
            return;
        }

        const userExist = await userService.getUserByEmail(email);
        if (userExist) {
            res.status(400);
            res.json({error: "Un utilisateur existe déjà avec cet email"});
            return;
        }

        const hashedPassword = await argon2.hash(password);

        const userToAdd = {
            username: username,
            email: email,
            role: role,
            pwd: hashedPassword,
            id: nextId
        };
        nextId++;

        await userService.createUser(username, email, hashedPassword);

        const token = await generateToken(userToAdd);

        const userToSend = {
            id: userToAdd.id,
            username: userToAdd.username,
            email: userToAdd.email,
            role: userToAdd.role,
        }
        res.status(200);
        res.json({token,user: userToSend});

    },
    login: async (req, res) => {
        const { password, email } = req.body;        
        
        const userFind = await userService.getUserByEmail(email);

        if (!userFind) {
            res.status(400);
            // en pratique, on n'indiquera que "l'email ou le password est incorrect"
            res.json({error: "Pas d'utilisateur trouvé avec cet email"});
            return;
        }

        if (! await argon2.verify(userFind.pwd, password)){
            res.status(400);
            // en pratique, on n'indiquera que "l'email ou le password est incorrect"
            res.json({error: "Le mot de passe est incorrect"});
            return;
        }

        const token = await generateToken(userFind);
        res.status(200);

         const userToSend = {
            id: userFind.id,
            username: userFind.username,
            email: userFind.email,
            role: userFind.role,
        }

        res.json({token,user: userToSend});
    },
    
    updatePassword: async (req, res) => {
        const { id, newPassword } = req.body;

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const newPwd = await argon2.hash(newPassword);
        await userService.updateUser(id, { pwd: newPwd });

        res.status(200)
        res.json({ message: "Mot de passe mis à jour avec succès" });
    },

    // creer une route user et un controller user pour updateUser et getUser

    getUser: async (req, res) => {
        const { id } = req.params;

        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const userToSend = { ...user };
        delete userToSend.pwd;

        res.status(200);
        res.json({ user: userToSend });
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, email } = req.body;

        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        const updatedUser = await userService.updateUser(parseInt(id), { username, email });
        delete updatedUser.pwd;

        res.status(200);
        res.json({ user: updatedUser });
    }
};

export default AuthController;