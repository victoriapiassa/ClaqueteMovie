import jwt from 'jsonwebtoken';
/**
 * Esse middleware verifica o token enviado na requisição e se ele é válido.
 * Um middleware é uma função intermediária que fica entre a requisição do cliente e a resposta do servidor.
 */


/**
 * função auth é para verificar a autenticação do usuário via token JWT
 * 
 * req: objeto de requisição HTTP
 * res: objeto de resposta HTTP
 * next: função para passar para o próximo middleware 
 */
export default function auth(req, res, next) {

/**
 * variavel 'token' para armazenar o token vindo da requisição
 */
  let token = undefined;

  /**
   *  Existe o header Authorization (cabeçalho de requisição )?
   */
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
