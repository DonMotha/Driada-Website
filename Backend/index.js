require("dotenv").config();
const app = require("./src/App/App")
const port = parseInt(process.env.PORT || "3000", 10)
const { dbConexion } = require("./src/Data/conexion")


dbConexion().then(()=>{


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
}).catch ((err) => {
    console.error("Fallo al conectar a Mongo, no se levantó el server:", err?.message);
    process.exit(1);
});

