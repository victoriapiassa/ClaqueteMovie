import express from "express";

import UserController from "../../controllers/UserController.js";
import auth from "../../middlewares/token.js";



const router = express.Router();

router 
    .get("/model", UserController.GetAllUsers) 
    .post("/model", UserController.CreateUser)
    .post("/login", UserController.LoginUser)

    .get("/me", auth, (req, res) => {
        res.json({
            message: "Token funcionando!",
            userId: req.userId
        });
    })


    /**
     * Rotas favorites, watched e toWatch
     */
    .post("/favorites", UserController.FavoriteMovie)
    .post("/verDepois", UserController.watchlistMovie)


    .delete("/favorites/:userId/:filmId", UserController.DeleteFilmFavorite)
    .get("/:userId/favorites", UserController.FavoriteMovieId)
    .post("/user/:id/uploud", UserController.UploadPhotoProfile)
    .post("/watched", UserController.WatchedMovie)

    


export default router;