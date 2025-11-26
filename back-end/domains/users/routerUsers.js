import express from "express";

import UserController from "../../controllers/UserController.js";

const router = express.Router();

router 
    .get("/model", UserController.GetAllUsers) 
    .post("/model", UserController.CreateUser)
    .post("/login", UserController.LoginUser)


    /**
     * Rotas favorites, watched e toWatch
     */
    .post("/favorites", UserController.FavoriteMovie)
    .delete("/favorites/:userId/:filmId", UserController.DeleteFilmFavorite)
    .get("/:userId/favorites", UserController.FavoriteMovieId)

export default router;