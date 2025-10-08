const mongoose = require("mongoose")

const becaSchema=new mongoose.Schema({
    
})

const Becas = mongoose.model("Beca",becaSchema,"Becas")

module.exports = {Becas}