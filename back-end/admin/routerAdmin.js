import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";
import User from "./../domains/users/model.js"; 
import 'dotenv/config';

const router = Router();

router.post("/loginAdmin", async (req, res) => {
  connectDB();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(password, user.password);
    console.log('Usuário encontrado:', user);
    if (!senhaCorreta) return res.status(401).json({ msg: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token,
               isAdmin: user.isAdmin,    
               msg: "Login realizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;