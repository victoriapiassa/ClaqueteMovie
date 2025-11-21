import express from "express";
import FilmController from "../../controllers/FilmController.js";

const router = express.Router();

router 
  .get("/modelFilm", FilmController.getAllFilms)
  .post("/modelFilm", FilmController.createFilm)
  .get("/modelFilm/:id", FilmController.getFilmById)
  .delete("/modelFilm/:id", FilmController.deletefilm)

export default router;