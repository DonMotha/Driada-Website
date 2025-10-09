const {Schema,model} = require("mongoose");

const carreraSchema = new Schema({
    Nombre: {Type: String, required: true},
    Empleabilidad: {Type: String, required: true},
    SueldoPromedio: {Type: Number, required: true},
    Descripcion: {Type: String, required: true},
    Palabras_C: {Type: String, required: true},
    Universidades_Ids: {Type: Array, required: true},
    Area: {Type: String, required: true}
})

module.exports = model("Carrera",carreraSchema,"Carreras")

