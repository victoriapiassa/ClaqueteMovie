import Film from "../domains/users/films/modelFilm.js";
import { connectDB } from "../config/db.js";

class FilmController {
    static async getAllFilms (req, res) {
        await connectDB();
        try {
          const films =  await Film.find();
          res.status(200).json(films);
        } catch (error) {
          res.status(500).json({ error: "Erro ao buscar filmes"});
     } 
   }   

   static async createFilm (req, res) {
        await connectDB();
        const { title, description, image, year, genre} = req.body;
        try {
            const newFilm = await Film.create({
                title,
                description,
                image,
                year,
                genre,
            });

            res.status(201).json(newFilm);
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar filme"});
        } 
    }

    static async getFilmById (req, res) {
        await connectDB();
        const id = req.params.id;
        try {
            const film = await Film.findById(id);
            res.status(200).json(film);

        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar Filme"})
        }
    }

    static async deletefilm (req, res) {
        await connectDB();
        const id = req.params.id;
        try {
            await Film.findByIdAndDelete(id);
            res.status(200).json({ message: "Filme removido com sucesso"});
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar filme"});
        }
    }
 }

 export default FilmController;

