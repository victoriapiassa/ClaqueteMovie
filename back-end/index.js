 import 'dotenv/config'; // importa dotenv(.env) para utilizar as variaveis de ambiente
 import express from "express"; // importa o express(fremerwork) para criar o servidor
 import { connectDB } from "./config/db.js"; // importa a função(connectDB) para conectar ao banco de dados
 import User from './models/user.js'; // importa o modelo de usuário(User) 

const app = express(); // cria uma instância do express
const { PORT } = process.env; // define a porta do servidor a partir das variáveis de ambiente

 app.get("/users", async (_req, res) => {  // rota para obter todos os usuários
    connectDB();
    try {
        const userDoc = await User.find(); // busca todos os usuários no banco de dados
        res.json(userDoc);  // retorna os usuários encontrados em formato JSON
    }catch (error) {
        res.status(500).json(error); // retorna um erro 404 se não encontrar usuários
    }
    
    
});

app.post("/users", async (req, res) => { // rota para criar um novo usuário
    connectDB();

    try {
        const newUserDoc = await User.create({
        name: "Teste",
        email: "teste@teste.com",
        password: "12345678910",
        }); 

        res.json(newUserDoc); // retorna o novo usuário criado em formato JSON

    }catch (error) {
        res.status(500).json(error)

    }
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});