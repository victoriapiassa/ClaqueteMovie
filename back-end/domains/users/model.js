import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true,  },
    password: String,
    isAdmin: { type: Boolean, default: false }
});

export default model("User", userSchema); 