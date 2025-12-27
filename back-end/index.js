 import 'dotenv/config.js'; // importa dotenv(.env) para utilizar as variaveis de ambiente
 import express from "express"; // importa o express(fremerwork) para criar o servidor
 import UserRoute from './domains/users/routerUsers.js';
 import cors from 'cors'; // importa o cors para permitir requisições de diferentes origens
 import filmRoutes from './domains/films/routerFilm.js';
 import routerAdmin from './admin/routerAdmin.js';

 import cookieParser from 'cookie-parser';
 
const app = express(); //cria seu servidor usando o Express e retorna app(objeto)
const { PORT } = process.env; // define a porta do servidor a partir das variáveis de ambiente

app.use(express.json()); // permite que sua API entenda o corpo das requisições em formato JSON (middleware )
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true, //permite aceitar cookie
}));

app.use(cookieParser());




app.use("/users", UserRoute); // define a rota base para usuários 

app.use("/films", filmRoutes);

app.use("/admin", routerAdmin);





app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});


