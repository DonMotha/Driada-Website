require("dotenv").config();
const app = require("./src/App/App")
const port = parseInt(process.env.PORT || "3000", 10)
const {dbConexion} = require("./src/Data/conexion")


dbConexion();


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

