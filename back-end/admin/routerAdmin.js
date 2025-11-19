import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";
import User from "./../domains/users/model.js"; 
import 'dotenv/config';


/**
 *   Router é uma função do Express que cria rotas, middleware e manipula requisições HTTP.
 */
const router = Router();

/**
 * Rota para logar na área administrativa
 */
router.post("/loginAdmin", async (req, res) => {
  connectDB();

  /**
   * Extrai o email e a senha do corpo da requisição
   */
  const { email, password } = req.body;


  /**
   * Tenta encontrar o usuário no banco de dados e verificar a senha
   */
  try {

    const userAdmin = await User.findOne({ email });
    /**
     * Se não existir o usuário, retorne o erro 401
     */
    if (userAdmin === null) 
      return res.status(401).json({ msg: "Usuário não encontrado" });
    
    /**
     * É criado uma variável  que espera a comparação entre a senha fornecida e a senha do usuário 
     */
    const senhaCorreta = await bcrypt.compare(password, userAdmin.password);
    /**
     * Se a senha for nula, ou seja, não exixtir retorne o erro 401 
     */
    if (senhaCorreta === null) return res.status(401).json({ msg: "Senha incorreta" });
    
    /**
     * gera um token JWT, que possui o ID do usuário e uma chave secreta para autenticação
     * sing() é uma função do JWT que cria o token que no caso é 'id: userAdmin._id'
     * process.env.JWT_SECRET é a chave secreta armazenada no arquivo .env
     */
    const token = jwt.sign({ id: userAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, isAdmin: userAdmin.isAdmin, msg: "Login realizado com sucesso" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;