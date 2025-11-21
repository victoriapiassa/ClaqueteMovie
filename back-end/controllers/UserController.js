import { connectDB } from '../config/db.js';
import User from '../domains/users/model.js'

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
            name, email, password: senhaCriptografada, sAdmin: isAdmin
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

        /**
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
            if (senhaCorreta === null) 
            return res.status(401).json({ msg: "Senha incorreta" });





            /**
             * se o usuário for encontrado e a senha estiver correta, gera um token JWT com o ID do usuário e uma expiração de 1 hora
             */
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
            res.json({ token, _id: user._id, msg: "Login realizado com sucesso" });





        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default UserController;