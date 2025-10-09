const mongoose = require("mongoose");

const becaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institucion", required: true },
        areas: { type: String },            // "Educación Superior"
        activa: { type: Boolean, default: true },
        tipo: { type: String },             // "Beca"
        modalidad: { type: String },        // "Presencial"
        requisitos: {
            type: mongoose.Schema.Types.Mixed // deja flexible (RSH, puntaje, etc.)
        },
        duracion: { type: String },         // "Carrera"
        fechas: { type: mongoose.Schema.Types.Mixed }, // { inicio, fin } u otro shape
        link: { type: String }
    },
    { collection: "Becas", timestamps: true }
);

const Beca = mongoose.model("Beca", becaSchema);
module.exports = { Beca };