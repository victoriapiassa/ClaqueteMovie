
/**
 * O arquivo é responsável por criar um usuário Admin no banco de dados MongoDB
 */




/**
 * importa o mongoose que é uma biblioteca de Modelagem de Dados de Objeto (MDO) para interar com o Mongo DB
 */
import mongoose from 'mongoose';

/**
 * importa o bcryptjs que é uma biblioteca para hash de senhas 
 */
import bcrypt from 'bcryptjs';

/**
 * importa o dotenv que é uma biblioteca para carregar variáveis de ambiente a partir de um arquivo .env
 */
import dotenv from 'dotenv';

/**
 * importa o modelo de usuário para interagir com a coleção de usuários no banco de dados
 */
import User from '../domains/users/model.js';



// carrega as variáveis de ambiente do arquivo .env
dotenv.config();


/**
 * Conecta ao banco de dados MongoDB usando a URL fornecida nas variaveis de ambiente 
 */
mongoose.connect(process.env.MONGO_URL)

/**
 * Após a conexão cria um usuario Admin com nome, email e senha 
 */
  .then(async () => {
    const senhaCriptografada = bcrypt.hashSync('123456', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: senhaCriptografada,
      isAdmin: true
    });

    
    console.log('Admin criado!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));

