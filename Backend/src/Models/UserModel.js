const {Schema,model} = require("mongoose");

const UsuarioSchema=new Schema({
    name : {type: String, require: true },
    correo:{type:String, require:true, unique:true,lowercase:true},
    password:{type:String,require:true, select :false},
    edad:{type:Number,require:true,min:0,max:120},
    localidad:{type:String}
})


module.exports =model("Usuario",UsuarioSchema,"Usuario")