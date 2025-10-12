import express from "express";
import FilmController from "../../../controllers/FilmController.js";

const router = express.Router();

router 
  .get("/filmes/modelFilm", FilmController.getAllFilms)
  .post("/filmes/modelFilm", FilmController.createFilm)
  .get("/filmes/modelFilm/:id", FilmController.getFilmById)
  .delete("/filmes/modelFilm/:id", FilmController.deletefilm)

export default router;