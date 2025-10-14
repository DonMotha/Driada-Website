const {Schema,model} = require("mongoose");

const carreraSchema = new Schema({
    Nombre: {type: String, required: true},
    Empleabilidad: {type: String, required: true},
    SueldoPromedio: {type: Number, required: true},
    Descripcion: {type: String, required: true},
    Palabras_C: {type: String, required: true},
    Universidades_Ids: {type: Array, required: true},
    Area: {type: String, required: true}
})

module.exports = model("Carrera",carreraSchema,"Carreras")

