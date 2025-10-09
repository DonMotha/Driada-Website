
const { Schema , model} = require("mongoose");

const becaSchema = new Schema(
    {
        nombre: { type: String, required: true },
        institutionId: { type: Schema.Types.ObjectId, ref: "Institucion", required: true },
        areas: { type: String },            // "Educación Superior"
        activa: { type: Boolean, default: true },
        tipo: { type: String },             // "Beca"
        modalidad: { type: String },        // "Presencial"
        requisitos: {
            type: Schema.Types.Mixed // deja flexible (RSH, puntaje, etc.)
        },
        duracion: { type: String },         // "Carrera"
        fechas: { type: Schema.Types.Mixed }, // { inicio, fin } u otro shape
        link: { type: String }
    },
    { collection: "Becas", timestamps: true }
);


module.exports = model("Beca", becaSchema, "Becas");