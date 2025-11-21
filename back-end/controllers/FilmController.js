import Film from "../domains/films/modelFilm.js";
import { connectDB } from "../config/db.js";


/**
 * Controllers é responsavel pelo fluxo da aplicação, no caso, controla a lógica da aplicação para uma rota especifica
 */
class FilmController {

    

    /**
     * getAllFilms - busca todos os filmes no banco de dados
     */
    static async getAllFilms (req, res) {
        await connectDB();



        /**
         * Se usa try e catch pois a requisição pode dar erro,
         * No try(tentar) Find() que é um método do mongoose usando o Film(model) retorna um array com todos os filmes,
         */
        try {
            const films =  await Film.find();
            res.status(200).json(films);



        /**
         * no catch(capturar) retorna o erro caso ocorra
         */

        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar filmes"});
        } 
    } 

    /**
     * createFilm, cadastra um novo filme no banco de dados
     */
    static async createFilm (req, res) {

        await connectDB();
        /**
         *  Foi criado uma variavel para pegar os dados necessários do corpo da requisição
         */
        const { title, description, image, year, genre} = req.body;

        /**
         * Create() retorna um objeto com os dados do filme cadastrado no banco de dados
         */
        try {
            const newFilm = await Film.create({
                title,
                description,
                image,
                year,
                genre,
            });


            /**
             * retorna um json com os dados do filme cadastrado
             */
            res.status(201).json(newFilm);
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar filme"});
        } 
    }


    /**
     * getFilmById - busca um filme pelo ID no banco de dados
     */
    static async getFilmById (req, res) {
        await connectDB();

        /**
         * O _id é pego dos parametros(params) da requisição
         */
        const id = req.params.id;
        try {
            const film = await Film.findById(id);

            /**
             * Retorna um objeto em JSON com os dados do filme 
             */
            res.status(200).json({
                film: film,
                is_favorited: true
            });
            
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar Filme"})
        }
    }

    /**
     * DeleTEfilm - deleta um filme pelo ID no banco de dados 
     */
    static async deletefilm (req, res) {
        await connectDB();
        const id = req.params.id;
        try {
            await Film.findByIdAndDelete(id); //tradução de findByIdAndDelete = encontrarPorIdEDeletar
            res.status(200).json({ message: "Filme removido com sucesso"});
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar filme"});
        }
    }
 }

 export default FilmController;

