const { Schema, model } = require("mongoose");

const institucionSchema=new Schema({
  Nombre: { type: String, require: true },
  Tipo: { type: String, require: true },
  Localidad: {type:String, require:true},
  Description:{type:String, require:true},
  link:{type:String, require:true},
  img:{type:String, require:true},
  Puntuacion:{type:Number,require:true},
  CantiOpiniones:{type:Number}
})
    ;

module.exports = model("Institucion", institucionSchema, "Instituciones")