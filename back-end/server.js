import express from "express";
import cors from "cors";
import filmRoutes from "./domains/users/films/routerFilm.js";
import User from "./domains/users/model.js";

const app = express();

app.use(cors());
app.use(express.json());

// usa as rotas
app.use("/films", filmRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

app.post("/users/model", async (req, res) => {
  const { userId, movieId, favorites } = req.body;

  try {
    if (favorites) {
      // Adiciona o filme aos favoritos
      await User.updateOne(
        { _id: userId },
        { $addToSet: { favorites: movieId } } // evita duplicatas
      );
    } else {
      // Remove dos favoritos
      await User.updateOne(
        { _id: userId },
        { $pull: { favorites: movieId } }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Erro ao atualizar favoritos." });
  }
});