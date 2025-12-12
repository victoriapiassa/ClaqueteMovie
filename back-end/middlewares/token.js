import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  let token;

  // 1. Tenta pegar o token pelo header Authorization
  if (req.headers.authorization) {
    const [_, tokenHeader] = req.headers.authorization.split(" ");
    token = tokenHeader;
  }

  // 2. Se não tiver no header, tenta pelos cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3. Se ainda não tiver token → erro
  if (!token) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
