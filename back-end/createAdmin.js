

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './domains/users/model.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
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

