import { Schema, model } from "mongoose"; // importa Schema e model do mongoose para definir o esquema e modelo do usuário


const userSchema = new Schema({ //define um objeto com um modelo de usuário
    name: String,
    email: { type: String, unique: true },
    passsword: String,
});

export default model("User", userSchema);