const app = require("./src/App/App")
const port = 3000
const {dbConneccion} = require("./src/Data/coneccion")

dbConneccion();


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
