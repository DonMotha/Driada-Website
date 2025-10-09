const mongoose = require("mongoose");
require("dotenv").config()

const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión exitosa a MongoDb")
    } catch (error) {
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = { dbConexion };
