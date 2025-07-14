 import 'dotenv/config';
 import express from "express";
 import { connectDB } from "./config/db.js"; // sem ou com js?

const app = express();
const { PORT, MONGO_URL } = process.env; 



 app.get('/', (_req, res) => {
    res.json("Olá, mundo!");    
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});