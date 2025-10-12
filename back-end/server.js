import express from "express";
import cors from "cors";
import filmRoutes from "./domains/users/films/routerFilm.js";

const app = express();

app.use(cors());
app.use(express.json());

// usa as rotas
app.use("/films", filmRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});