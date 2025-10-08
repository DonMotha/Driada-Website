const mongoose = require("mongoose")

const institucionSchema=new mongoose.Schema({
    
})

const Institucion = mongoose.model("Institucion",institucionSchema,"Instituciones")

module.exports = {Institucion}