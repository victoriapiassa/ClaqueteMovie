import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  // Formato esperado: "Bearer token_aqui"
  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // envia o ID para as rotas protegidas
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
