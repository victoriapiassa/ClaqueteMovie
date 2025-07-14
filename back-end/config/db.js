import "dotenv/config";
import mongoose from "mongoose";    

const { MONGO_URL } = process.env;

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Deu certo a conexão com o banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}

