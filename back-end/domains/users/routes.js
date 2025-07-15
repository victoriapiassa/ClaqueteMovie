import { Router } from "express";
import { connectDB } from "../../config/db.js"; // importa a função(connectDB) para conectar ao banco de dados
import User from './model.js'; // importa o modelo de usuário(User) 
import bcrypt from "bcryptjs"

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();


router.get("/", async (req, res) => {  // rota para obter todos os usuários
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

    console.log(req);

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

export default router; 