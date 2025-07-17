 import 'dotenv/config'; // importa dotenv(.env) para utilizar as variaveis de ambiente
 import express from "express"; // importa o express(fremerwork) para criar o servidor
 import UserRouters from './domains/users/routes.js';
 import cors from 'cors'; // importa o cors para permitir requisições de diferentes origens

const app = express(); //cria seu servidor usando o Express e retorna app(objeto)
const { PORT } = process.env; // define a porta do servidor a partir das variáveis de ambiente

app.use(express.json()); // permite que sua API entenda o corpo das requisições em formato JSON (middleware )
app.use(cors())
app.use("/users", UserRouters); // define a rota base para usuários

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
