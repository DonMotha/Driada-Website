const mongoose = require("mongoose");

const dbConneccion = async () => {
    try {
        await mongoose.connect("mongodb+srv://valentinavaldiviame:Driada12345@cluster0.9woi1em.mongodb.net/Driada?retryWrites=true&w=majority");
        console.log("Conexión exitosa a MongoDb")
    } catch (error) {
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = { dbConneccion };