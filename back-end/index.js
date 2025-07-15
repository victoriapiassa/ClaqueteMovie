 import 'dotenv/config'; // importa dotenv(.env) para utilizar as variaveis de ambiente
 import express from "express"; // importa o express(fremerwork) para criar o servidor
 import UserRouters from './domains/users/routes.js';

const app = express(); // cria uma instância do express
const { PORT } = process.env; // define a porta do servidor a partir das variáveis de ambiente

app.use(express.json());
app.use("/users", UserRouters);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
