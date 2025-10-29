import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String, // URL da imagem do filme
  year: Number,
  genre: String,
  director: String,
  cast: [String] // Array de nomes do elenco

});

const Film = mongoose.model("Film", FilmSchema);

export default Film;