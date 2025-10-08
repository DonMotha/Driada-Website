const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://valentinavaldiviame:Driada12345@cluster0.9woi1em.mongodb.net/Driada?retryWrites=true&w=majority")
  .then(()=> console.log("Conexión exitosa a MongoDb"))
  .catch(err=>console.error("Error al conectar a MongoDB",err.message));

const institucionSchema = new mongoose.Schema({
  NOMBRE: { type: String, required: true }
});

const Institucion = mongoose.model("Institucion",institucionSchema,"Institucion")


app.get("/institucion", async (req, res) => {
  try {
    // 1) Toma SOLO el valor del query param
    //    Soportamos NOMBRE o nombre por si acaso
    const raw = req.query.NOMBRE ?? req.query.nombre;

    // 2) Si llegan múltiples, toma el primero
    const nombre = Array.isArray(raw) ? raw[0] : raw;

    // 3) Valida que sea string no vacío
    if (typeof nombre !== "string" || !nombre.trim()) {
      return res.status(400).json({
        error: "Falta query param 'NOMBRE'. Ej: /institucion?NOMBRE=UTEM"
      });
    }

    // 4) (Opcional) Búsqueda case-insensitive escapando caracteres especiales
    const escaped = nombre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const institucion = await Institucion.findOne({
      NOMBRE: new RegExp(`^${escaped}$`, "i")
    });

    if (!institucion) {
      return res.status(404).json({
        error: `No se encontró Institucion con NOMBRE='${nombre}'`
      });
    }

    return res.json(institucion);
  } catch (err) {
    console.error("Error en GET /institucion:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('hola post')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
