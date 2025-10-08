const mongoose = require("mongoose")

const UsuarioSchema=new mongoose.Schema({
    
})

const User = mongoose.model("Usuario",UsuarioSchema,"Usuario")

module.exports = {User}