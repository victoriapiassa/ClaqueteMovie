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
            console.log('Usuários encontrados:', users);
            res.status(200).json(users);
           
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async CreateUser (req, res) {
        await connectDB();

        const { name, email, password, isAdmin } = req.body; 
        const senhaCriptografada = bcrypt.hashSync(password, bcryptSalt); // criptografa a senha do usuário

        try {
            const newUserDoc = await User.create({
            name, email, password: senhaCriptografada, sAdmin: isAdmin
            }); 
        
            res.json(newUserDoc); // retorna o novo usuário criado em formato JSON       
        }catch (error) {
            res.status(500).json(error)
        
        }       
    }
}

export default UserController;