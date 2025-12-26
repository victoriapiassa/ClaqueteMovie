import express from "express";

import UserController from "../../controllers/UserController.js";
import auth from "../../middlewares/token.js";



const router = express.Router();

router 
    .get("/model", UserController.GetAllUsers) 
    .post("/model", UserController.CreateUser)
    .post("/login", UserController.LoginUser)

    .post('/logout', auth, UserController.logout)
    .get("/me", auth, UserController.Me)
    .get('favorites', auth, UserController.getMyFavorites) //não alterar essa rota

    



    /**
    * Rotas favorites, watched e toWatch
    */
    .post("/me/favorites", UserController.FavoriteMovie)
    .post("/verDepois", UserController.watchlistMovie)


    .delete("/favorites/:userId/:filmId", UserController.DeleteFilmFavorite)
    .post("/me/favorites", auth, UserController.FavoriteMovieId) // não alterar essa rota 
    .post("/user/:id/uploud", UserController.UploadPhotoProfile)
    .post("/watched", UserController.WatchedMovie)



    


export default router;