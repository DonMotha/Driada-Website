const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  name:         { type: String, required: true, trim: true },   // <- mantiene "name"
  correo:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },// <- hash oculto
  edad:         { type: Number, required: true, min: 0, max: 120 },
  localidad:    { type: String }
}, {
  timestamps: true,
  collection: "Usuario" // exacto como en tu BD
});

UsuarioSchema.index({ correo: 1 }, { unique: true });

module.exports = model("Usuario", UsuarioSchema);
