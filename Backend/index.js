const app = require("./src/App/App")
const port = 3000
const {dbConexion} = require("./src/Data/conexion")

dbConexion();


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
