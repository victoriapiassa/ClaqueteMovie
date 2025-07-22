import { Schema, model } from "mongoose";
im

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true,  },
    password: String,
});

export default model("User", userSchema); 