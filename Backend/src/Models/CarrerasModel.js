const mongoose = require("mongoose")

const carreraSchema=new mongoose.Schema({
    
})

const Carreras = mongoose.model("Institucion",carreraSchema,"Carreras")

module.exports = {Carreras}