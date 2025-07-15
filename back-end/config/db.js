import "dotenv/config"; // importação das variaveis de ambiente do arquivo .env
import mongoose from "mongoose";     // importação do mongoose para conectar ao MongoDB

const { MONGO_URL } = process.env;

export async function connectDB() { //função para conectar ao banco de dados 
    try {
        await mongoose.connect(MONGO_URL);  // mongoose é um biblioteca do node para conectar ao Mongo que organiza, valida e manipula os dados 
        console.log('Deu certo a conexão com o banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}

