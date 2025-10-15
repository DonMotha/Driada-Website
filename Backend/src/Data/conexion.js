const mongoose = require("mongoose");
require("dotenv").config()

const dbConexion = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI no está definido. Revisa tu .env");
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: true, // útil en dev
        });
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error?.message, error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = { dbConexion };
