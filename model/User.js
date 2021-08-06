const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    pontuacao: { type: Number }
})

module.exports = model("User", UserSchema)