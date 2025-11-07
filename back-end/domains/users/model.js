import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true,  },
    password: String,
    favorites: [String],
    verDepois: [String],
    watched: [String],
    isAdmin: { type: Boolean, default: false }
});

export default model("User", userSchema); 