// tem como finalidade definir as rotas da API relacionadas ao usuário
import  'dotenv/config.js'; //importa as variaveis de ambiente do arquivo .env 
import { Router } from "express";
import { connectDB } from "../../config/db.js"; // importa a função(connectDB) para conectar ao banco de dados
import User from './model.js'; // importa o modelo de usuário(User) 
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const router = Router(); //
const bcryptSalt = bcrypt.genSaltSync(); 
const { JWT_SECRET_KEY } = process.env;


router.get("/", async (req, res) => {   // rota para buscar todos os usuários
    connectDB();
    
    try {
        const userDoc = await User.find(); // busca todos os usuários no banco de dados
        res.json(userDoc);  // retorna os usuários encontrados em formato JSON
    }catch (error) {
        res.status(500).json(error); // retorna um erro 404 se não encontrar usuários
    }   
});

router.post("/", async (req, res) => { // rota para criar um novo usuário
    connectDB();

    const { name, email, password, isAdmin } = req.body; 
    const encryptePassword = bcrypt.hashSync(password, bcryptSalt); // criptografa a senha do usuário

    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: encryptePassword,
            isAdmin: isAdmin
        }); 

        res.json(newUserDoc); // retorna o novo usuário criado em formato JSON

    }catch (error) {
        res.status(500).json(error)

    }
});

router.post("/login", async (req, res) => {  // rota para fazer login do usuário
    connectDB();

    const {email, password} = req.body; // obtém o email e a senha do corpo da requisição

    try { 
        const userDoc = await User.findOne({email});

        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password); 
            const {name, _id} = userDoc;

            if(passwordCorrect) {
                const newUserObj = { name, email, _id};
                const token = jwt.sign(newUserObj, JWT_SECRET_KEY);  //node / forma sincrona 

                res.cookie("token", token).json(newUserObj); 
            } else { 
                res.status(400).json("Senha incorreta!");  
            }
                
        } else {
            res.json("Usuário não encontrado!"); 
        }
    }catch (error) {
        res.status(500).json(error);
    }
});

// rota para favoritar um filme 
router.post("/favorites", async (req, res) => {  //add
  const { userId, movieId, favorites } = req.body;

  if (!userId || !movieId) { // se user ou movie for diferente  de true retorne..
    return res.status(400).json({ message: "Dados incompletos." });
  }

  try {
    if (favorites) {
      // Adiciona o filme aos favoritos, evitando duplicatas
      await User.findByIdAndUpdate(userId, {
        $addToSet: { favorites: movieId },
      });
    } else {
      // Remove o filme da lista de favoritos
      await User.findByIdAndUpdate(userId, {
        $pull: { favorites: movieId },
      });
    }

    res.status(200).json({ message: "Favoritos atualizados com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar favoritos:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

//rota para ver depois um filme
router.post("/verDepois", async (req, res) => {
  const { userId, movieId, verDepois } = req.body;

  if (!userId || !movieId) { 
    return res.status(400).json({ message: "Dados incompletos."});
  }
     try {
       if (verDepois) {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { verDepois: movieId },
        });
       } else {
         await User.findByIdAndUpdate(userId, {
          $pull: { verDepois: movieId },
        });
      }
      res.status(200).json({ message: "Lista 'ver depois' atualizada com sucesso!" });
      
    } catch (error) {
      console.error("Erro ao atualizar Ver Depois:", error);
      res.status(500).json({ message: "Erro no servidor." });
   }
 });

 // rota para marcar um filme como assistido
router.post("/watched", async (req, res) => {
  const { userId, movieId, watched } = req.body;

  if (!userId || !movieId) { 
    return res.status(400).json({ message: "Dados incompletos."});
  }
     try {
       if (watched) {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { watched: movieId },
        });
       } else {
         await User.findByIdAndUpdate(userId, {
          $pull: { watched: movieId },
        });
      }
      res.status(200).json({ message: "Lista 'ver depois' atualizada com sucesso!" });
      
    } catch (error) {
      console.error("Erro ao atualizar Assistido:", error);
      res.status(500).json({ message: "Erro no servidor." });
  }
 });

 // rota para obter a lista de filmes favoritos de um usuaário
router.get("/:userId/favorites", async (req, res) => { 
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favorites"); // ← isso traz os filmes completos
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user.favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

export default router; 