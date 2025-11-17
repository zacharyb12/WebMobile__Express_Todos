import argon2 from "argon2";
import { generateToken } from "../utils/jwt.utils.js";

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

        const userExist = users.find(user => user.email === email);
        if (userExist) {
            res.status(400);
            res.json({error: "Un utilisateur existe déjà avec cet email"});
            return;
        }

        const hashedPassword = await argon2.hash(password);

        const user = {
            username: username,
            email: email,
            role: role,
            pwd: hashedPassword,
            id: nextId
        };
        nextId++;

        users.push(user);

        const token = await generateToken(user);
        res.status(200);
        res.json({token,user});

    },
    login: async (req, res) => {
        const { password, email } = req.body;
        console.log(req);
        
        
        const user = users.find(user => user.email === email);

        if (!user) {
            res.status(400);
            // en pratique, on n'indiquera que "l'email ou le password est incorrect"
            res.json({error: "Pas d'utilisateur trouvé avec cet email"});
            return;
        }

        if (! await argon2.verify(user.pwd, password)){
            res.status(400);
            // en pratique, on n'indiquera que "l'email ou le password est incorrect"
            res.json({error: "Le mot de passe est incorrect"});
            return;
        }

        const token = await generateToken(user);
        res.status(200);

        const userToSend = { ...user };
        delete userToSend.pwd;

        res.json({token,user: userToSend});
    },
    updatePassword: async (req, res) => {
        const { id, newPassword } = req.body;

        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const newPwd = await argon2.hash(newPassword);
        user.pwd = newPwd;

        res.status(200)
        res.json({ message: "Mot de passe mis à jour avec succès" });
    },
    getUser: (req, res) => {
        const { id } = req.params;

        const user = users.find(u => u.id === parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const userToSend = { ...user };
        delete userToSend.pwd;

        res.status(200);
        res.json({ user: userToSend });
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        const { username, email } = req.body;

        const user = users.find(u => u.id === parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        const userToSend = { ...user };
        delete userToSend.pwd;

        res.status(200);
        res.json({ user: userToSend });
    }
};

export default AuthController;