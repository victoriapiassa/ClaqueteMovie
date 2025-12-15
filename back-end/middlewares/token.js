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
  console.log("Headers Authorization:", token);

  /**
   *  Existe o header Authorization (cabeçalho de requisição )?
   */
  if (req.headers.authorization) {
    

    /**
     * desestruturação de array. Pega o token do header Authorization
     * o _ é usado para ignorar o primeiro valor do array (que é "Bearer")
     * O metodo split() transforma string em array
     */
    const [_, tokenHeader] = req.headers.authorization.split(" ");


    /**
     * atribui o token do header à variavel token
     */
    token = tokenHeader;
  }

  //  Se não tiver no header, tenta pelos cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  //  Se ainda não tiver token vai retornar uma mensagem de erro
  if (!token) {
    return res.status(401).json({ message: "Token não enviado" });
  }


  /**
   * Tente verificar o token usando a chave secreta 
   */
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * Se o token for válido, adiciona o ID do usuário ao objeto req
     */
    req.userId = decoded.id;

    /**
     * 
     */
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}


// precisa resolver o problema do logout
