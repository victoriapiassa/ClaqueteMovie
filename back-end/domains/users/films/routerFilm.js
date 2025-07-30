import { Router } from "express";
import { connectDB } from "../../../config/db.js";
import Film from "./modelFilm.js";


const router = Router();

router.get("/", async (_req, res) => {
  connectDB();
  try {
    const films = await Film.find();
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

router.post("/", async (req, res) => {
  connectDB();
  const { title, description, image, releaseDate, genre } = req.body;

  try {
    const newFilm = await Film.create({
      title,
      description,
      image,
      releaseDate,
      genre,
    });
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar filme" });
  }
});

export default router;