import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String, // URL da imagem do filme
  releaseDate: Date,
  genre: String
});

const Film = mongoose.model("Film", FilmSchema);

export default Film;