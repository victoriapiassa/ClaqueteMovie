// tem como finalidade definir as rotas da API relacionadas ao usuário
import  'dotenv/config.js'; //importa as variaveis de ambiente do arquivo .env 
import { Router } from "express";
import { connectDB } from "../../config/db.js"; // importa a função(connectDB) para conectar ao banco de dados
import User from './model.js'; // importa o modelo de usuário(User) 
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Film from '../films/modelFilm.js';


const router = Router(); //
const bcryptSalt = bcrypt.genSaltSync(); 
const { JWT_SECRET_KEY } = process.env;


/* router.get("/", async (req, res) => {   // rota para buscar todos os usuários
    connectDB();
    
    try {
        const userDoc = await User.find(); // busca todos os usuários no banco de dados
        console.log('usuarios:', userDoc)
        res.json(userDoc);  // retorna os usuários encontrados em formato JSON
        
    }catch (error) {
        res.status(500).json(error); // retorna um erro 404 se não encontrar usuários
    }   
}); */

/* router.post("/", async (req, res) => { // rota para criar um novo usuário
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
}); */

 /*
  router.post("/login", async (req, res) => {  // rota para fazer login do usuário
    connectDB();

    const {email, password} = req.body; // obtém o email e a senha do corpo da requisição

    try { 
        const user = await User.findOne({email}); // findOne busca um usuário com o email fornecido
        if (!user) 
          return res.status(401).json({ msg: "Usuário não encontrado" });

         let senhaCorreta = await bcrypt.compare(password, user.password);
          console.log('Usuário encontrado:', user); //ta funcionando

         if (!senhaCorreta) 
          return res.status(401).json({ msg: "Senha incorreta" });

         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
          res.json({ token, _id: user._id, msg: "Login realizado com sucesso" });

              if (user) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password); 
            const {name, _id} = user;

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
}); */





// rota para favoritar um filme 
router.post("/favorites", async (req, res) => {  //add
  connectDB();
  const { userId, movieId } = req.body; //variavel que armazena o user,movie e filmes fav

  if (!userId || !movieId) { // se user ou movie for diferente  de true retorne..
    return res.status(400).json({ message: "Dados incompletos." });
  }

    let user = await User.findById(userId);  // user armazena o id de user com findById
    let favorites = user.favorites; // favorites atribui o mesmo valor de user.favorites

  if(favorites.find((e) => { return e == movieId})){ // o find procura 'e' se é igual a movieId
      favorites = favorites.filter(e => { // o filter cria um array com os filmes q  são diferentes de fav
      return e != movieId; 
    });
  } else {   // se não achar na lista o push adiciona na lista
    favorites.push(movieId);
  }

    try {
   
    // Adiciona o filme aos favoritos, evitando duplicatas
    //await User.findByIdAndUpdate(userId, {
    //  $addToSet: { favorites: __favorites },
    //});

    await User.findById(userId).updateOne({
      favorites: favorites
   });
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

 //pega os filmes favoritos do usuario
router.get("/:userId/favorites", async (req, res) => {
  connectDB();
  const { userId } = req.params;

  console.log("Buscando favoritos do usuário:",  userId);

  try {
    const user = await User.findById(userId);

    let favorites = user.favorites.filter(e => {
      return e != ''; 
    });

    const movies = await Film.find().where('_id').all(favorites);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json({ favorites: movies });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

export default router; 