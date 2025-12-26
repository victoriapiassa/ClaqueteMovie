
import { connectDB } from '../config/db.js';
import User from '../domains/users/model.js';

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';



/**
 * Controller é agir como intermediário entre a View (interface com o usuário) e o Model (a lógica de dados da 
 * aplicação). Ele é responsável por processar as entradas do usuário (geralmente via ações na interface), 
 * manipular os dados de acordo com as necessidades, e então retornar a resposta apropriada à View.
 *  */

class UserController {
 
    /**
     * GetAllUsers - busca todos os usuários no banco de dados
     */
    static async GetAllUsers (req, res) {
        await connectDB();

        /**
         * Find(encontrar) é um método do mongoose que retorna um array com todos os usuários
         */
        try {
            const users = await User.find();
            res.status(200).json(users);
           
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * CreateUser - Função que cria um novo usuário no banco de dados (post)
     */
    static async CreateUser (req, res) {

        const bcryptSalt = bcrypt.genSaltSync(); 
        const { JWT_SECRET_KEY } = process.env;


        await connectDB();

        /**
         * Na função CreateUser foi criado uma variável para pegar os dados name, email, password e isAdmin no corpo da requisição. Além disso, a senha é criptografada usando bcrypt antes de ser salva no banco de dados. 
         */
        const { name, email, password, isAdmin } = req.body; 
        const senhaCriptografada = bcrypt.hashSync(password, bcryptSalt); // criptografa a senha do usuário


        /**
         * Try(tenta) tenta esperar a criação de um novo usuário com os dados fornecidos
         * Create(criar) é um método do mongoose que retorna um objeto com os dados cadastrado no banco
         */
        try {
            const newUser = await User.create({
            name, email, password: senhaCriptografada, isAdmin: isAdmin
            }); 
        
            res.json(newUser); // retorna o novo usuário criado em formato JSON       
        }catch (error) {

            /**
             * No catch(capturar) retorna um erro caso ocorra
             */
            res.status(500).json(error)
        
        }       
    }

    /**
     * LoginUser - Função para fazer login do usuário
     */
    static async LoginUser (req, res) {
        await connectDB();

        /*
         * Assim que conectar com o banco de dados, obtem o email e a senha do corpo da requisição.
         */
        const {email, password} = req.body;

        try { 
           /**
            * Espera(await) a busca pelo email fornecido usando o FinOne(buscarUm)
            */
            const user = await User.findOne({email});





            /**
             * se o usuário não existir(nulo) retorna uma mensagem de erro 'Usuário não encontrado'
             */
            if (user === null) 
                return res.status(401).json({ msg: "Usuário não encontrado" });


            

            /**
             * aqui compara a senha fornecida com a senha armazenada no banco de dados usando 'compare'
             */
            let senhaCorreta = await bcrypt.compare(password, user.password);
            console.log('Usuário encontrado:', user); //ta funcionando





            /**
             * se a senha estiver incorreta(nulo) retorna uma mensagem de erro 'Senha incorreta'
             */
            if (!senhaCorreta) 
            return res.status(401).json({ msg: "Senha incorreta" });




            /**
             * se o usuário for encontrado e a senha estiver correta, gera um token JWT com o ID do usuário e uma expiração de 1 0hora
             */
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); 

            res.cookie('token', token, {
            httpOnly: true,
            secure: false,   // true em produção https
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60   // 1 hora
            });
            return res.json({ token, _id: user._id, name: user.name, msg: "Login realizado com sucesso!" });

        

        } catch (error) {
            res.status(500).json(error);
        }
    }

    /** logout - função para fazer logout */
    static async logout(req, res) {
        try {
            // Remove o cookie chamado "token"
            res.clearCookie('token', {
                httpOnly: true,
                secure: false, // coloque true em produção https
                sameSite: 'lax'
            });

            return res.status(200).json({ message: "Deslogado com sucesso" });
        } catch (error) {
            
            return res.status(500).json({ message: "Erro ao deslogar" });
        }
    
}

    /**
     * Me - Função para ter os dados do ousuario que esta autenticado com o token
     */
    static async Me(req, res) {
    await connectDB();


    /**
     * Aqui o token é obtido pela requisição
     */
    try {
        const token = req.cookies.token;

        /**
         * Se não tiver o token, vai retornar uma mensagem de 'não autenticado'
         */
        if (!token) {
            return res.status(401).json({ msg: "Não autenticado" });
        }

        
        /**
         * Verifica e decodifica o token usado com o metodo verify do jwt
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        /**
         * Busca o usuário pelo ID decodificado do token, excluindo a senha dos dados retornados 
         */
        const user = await User.findById(decoded.id).select("-password");

        /**
         * Se o usuário for diferente, retona uma mensagem 
         */
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar usuário", error });
    }
}

    /**
    * verifyFavoriteMovie - Encontrar usuario no banco de dados 
    */
    
   static async getMyFavorites(req, res) {
    await connectDB();

    try {
    const userId = req.userId; // vem do token, NÃO da URL

    console.log("Buscando favoritos do usuário - getMyFavorites:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({
      favorites: user.favorites
    });

  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return res.status(500).json({
      message: "Erro ao buscar favoritos"
    });
  }
}













    /**
    * FavoriteMovie - Função para adicionar ou remover um filme dos favoritos 
    */
    static async FavoriteMovie(req, res) {
     await connectDB();





     /**
      * Obtém o userId e filmeId do corpo da requisção
      */
    const { userId, filmId } = req.body;





    /**
     * Se userId ou FilmId não existirem, return  um  erro 400
     */
    if (!userId || !filmId) {
        return res.status(400).json({ msg: "Dados incompletos" });
    }





    try {
       /**
        * Busca o usuário pelo ID fornecido por meio do FindById(buscarPorId)
        */
        const user = await User.findById(userId);




        /**
        * Se o usuário não for encontrado, retorna um erro 404
        */

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }




        /**
         * Carregar lista de favoritos OU um array vazio (porque o user pode não ter filmes favoritos)
         */
        let favorites = user.favorites || [];


        // Verificar se já está nos favoritos. O método includes() determina se um conjunto de caracteres pode ser encontrado dentro de outra string, retornando true ou false. No caso seria filmId. "Em favorites existe filmId? se sim."
        if (favorites.includes(filmId)) {
            



            /**
             * Se a resposta for sim, o Filter cria um novo array com todos os elementos DIFERENTES de FilmId. Ou seja, cria um array com filmes não favoritados. 
             */
            favorites = favorites.filter(id => id !== filmId);


        /**
         * Se não adiciona com Push() no array de filme favoritados
         */
        } else {  
            // adicionar o filme
            favorites.push(filmId);
        }

        /**
         * FindByIdAndUpdate() atualize o UserId com o array atualizado
         */
        await User.findByIdAndUpdate(userId, { favorites });

        return res.status(200).json({
            message: "Favoritos atualizados com sucesso!", favorites
        });

    } catch (error) {
        console.error("Erro ao atualizar favoritos:", error);
        res.status(500).json({ message: "Erro no servidor." });
    }
  }




    /**
    * 
    *FUNÇÕES RESPONSAVEIS POR ADMINISTRAR OS BUTTONS DE FAVORITAR, ASSISTIDO, VER DEPOIS E DELETAR FILME
    */


    /**
    * favoriteMovieId - função para favoritar ou desfavoritar um filme pelo ID do usuário autenticado
    */
    static async FavoriteMovieId(req, res) {
     await connectDB();





    /**
    * Obtém o 'userId' do token da requisição e o filmId do corpo da requisição'
    */
     try { 
     const userId = req.userId;

     const { filmId } = req.body;

     console.log("req.body:", req.body);



    /**
    * se filmId for diferente retorne uma mensagem 
    */
     if (!filmId) {
      return res.status(400).json({ msg: "filmId é obrigatório" });
     }



     
    /**
     * foi criado uma váriavel para guardar o userId(token da requisição)
     */
     const user = await User.findById(userId);
    



    /**
     * se user for diferente  retorne uma mensagem de 'usuário não encontrado'
     */
     if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
     }



    /**
     * O infexOf() é um método de array que retorna o índice(posição) de um array 
     * 
     * Exemplo:
     * const frutas = ["maçã", "banana", "uva"];
     * frutas.indexOf("banana"); 
     * // retorna 1
     * 
     * se retornar -1 (para todos os casos) significa que o index não foi encontrado na lista de array
     */
     const index = user.favorites.indexOf(filmId);



     /**
      * se index for diferente(!==) o tipo e o valor de -1 (ou seja, o filme já esta nos favoritos), remova o filme(index) dos favoritos usando splice()
      * 
      * foi usado uma comparação !==(diferente) estrita para garantir que tanto o valor quanto o tipo sejam diferentes de -1
      * 
      * Exemplo:
      * comparação simples
      * 5 != "5"   // false (iguais em valor, mas diferentes em tipo). O js converte "5" para o number 5 antes de comparar, assim retorna false pois os valores ficam iguais "5" e "5". Para dar true, um dos valores deve ser diferente. 
      */
     if (index !== -1) {
      user.favorites.splice(index, 1); // remove


      /** 
       * se o filme não estiver nos favoritos (index é -1), aficiona o filme com o método push()
       */
     } else {
      user.favorites.push(filmId); // adiciona
     }


     /**
      * Espera salvar as alterações no usuário no banco de dados e retorna 
      */
     await user.save();

     return res.status(200).json({
      message: "Favoritos atualizados com sucesso!",
      favorites: user.favorites,
    });

  } catch (error) {
    console.error("Erro ao atualizar favoritos:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}


    static async DeleteFilmFavorite (req, res) {
       await connectDB()


        /**
        * Na requisição é pego o userId e filmId 
        */
        const { userId, filmId } = req.params;

         



        /**
        *Se o usuário for diferente de user retorna uma mensagem de usuário não encontrado
        */
        if(!userId || !filmId) 
            return res.status(404).json({ msg: "Usuário não encontrado" });
            

        /**
        * Try(tenta) pegar buscar com findById() o id do usuário
        */
        try {

            const user = await User.findById(userId);


            /**
            * Se user for diferente retorne 'usuário não encontrado'
            */
            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });

            }


            /**
            *Filter() cria um novo array filtrando cada item de acordo com o parametro. Para cada item se pergunta: esse id 
            *é diferente do filmId que quero remover?' Se for diferente do Id do parametro, os filmes ficam. Se for igual, 
            *é removido.
            * É usado toString()  pois o mongo as vezes devolve IDs como ObjectId
            * 
            *  Ex: ObjectId("123") / !== "123"(errado)
            *  123" === "123"    certo 
            */
            user.favorites = user.favorites.filter(id => id.toString() !== filmId);

            await user.save(); // salva a alteração

            return res.status(200).json({ msg: "Filme removido dos favoritos" });


         /**
          * Erro que estava dando erro 500
          */
         /*  let favorites = user.favorites 

         if (favorites.includes(filmId)) {

         favorites = favorites.findByIdAndDelete(filmId) //aqui deu erro, favorites é um array, não um modelo Mongoose. 

         } */
        

        } catch (error) {

            res.status(500).json({ error: error.message });
            
        }


    }


    static async watchlistMovie ( req, res) {
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
}


    static async WatchedMovie (req, res) {

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
    }





    /**
     *  UPGRADE DA IMAGEM DO PROFILE 
     */

    
    static async UploadPhotoProfile (req, res) {
        await connectDB()

        try {

            const userId = req.params.id // aqui o express pega o valor do id da requisição
            
            /**
            * Se a requisição(req) não for igual a file(arquivo que o multer salva a img) retorna uma mensagem
            */
            if (!req.file) {

             return res.status(400).json({ msg: "Nenhuma imagem enviada" });
            }
            
            const imagePath = req.file.path; // caminho onde foi salva

            const updatedUser = await User.findByIdAndUpdate(userId,
                { profileImage: imagePath },
                { new: true } // retorna o user atualizado
           );

            if (!updatedUser) {
              return res.status(404).json({ msg: "Usuário não encontrado" });

            }else {
              return res.status(200).json({ msg: "Imagem enviada e salva no banco!", user: updatedUser}); 
                 
            }

        } catch (error) {
            return res.status(500).json({ msg: "Erro ao enviar imagem", error})
            
        }
    }
} 

export default UserController;