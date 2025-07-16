// tem como finalidade definir as rotas da API relacionadas ao usuário

import { Router } from "express";
import { connectDB } from "../../config/db.js"; // importa a função(connectDB) para conectar ao banco de dados
import User from './model.js'; // importa o modelo de usuário(User) 
import bcrypt from "bcryptjs"

const router = Router(); //
const bcryptSalt = bcrypt.genSaltSync();


router.get("/", async (req, res) => {   // rota para buscar todos os usuários
    connectDB();
    
    try {
        const userDoc = await User.find(); // busca todos os usuários no banco de dados
        res.json(userDoc);  // retorna os usuários encontrados em formato JSON
    }catch (error) {
        res.status(500).json(error); // retorna um erro 404 se não encontrar usuários
    }   
});

router.post("/", async (req, res) => { // rota para criar um novo usuário
    connectDB();

    const { name, email, password } = req.body; 
    const encryptePassword = bcrypt.hashSync(password, bcryptSalt); // criptografa a senha do usuário

    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: encryptePassword
        }); 

        res.json(newUserDoc); // retorna o novo usuário criado em formato JSON

    }catch (error) {
        res.status(500).json(error)

    }
});

router.post("/login", async (req, res) => {  // rota para fazer login do usuário
    connectDB();

        const {email, password} = req.body; // obtém o email e a senha do corpo da requisição

     try { 
        const userDoc = await User.findOne({email});

        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password); 
            const {name, _id} = userDoc;

            passwordCorrect 
                ? res.json({name, email, _id}) 
                : res.status(400).json("Senha incorreta!");  
        } else {
            res.json("Usuário não encontrado!"); 
        }
    }catch (error) {
        res.status(500).json(error);
    }
});

export default router; 