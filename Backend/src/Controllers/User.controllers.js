const jwt = require("jsonwebtoken")
const Usuario = require("../Models/UserModel")
const bcrypt = require("bcrypt")

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_ISSUER = "Driada-Website";
const BCRYPT_COST = parseInt(process.env.BCRYPT_COST || "12", 10);

//Registro de usuario
const RegistroUser = async (req, res) => {
    try {
        const { name, correo, password, edad, localidad } = req.body || {};
        if (!name || !correo || !password || edad == null)
            return res.status(400).json({ message: "Debe ingresar todos los requerimientos" });

        const correoNorm = String(correo).trim().toLowerCase();
        if (await Usuario.exists({ correo: correoNorm }))
            return res.status(409).json({ message: "El correo ya está registrado" });

        const passwordHash = await bcrypt.hash(String(password).trim(), BCRYPT_COST);

        const nuevo = await Usuario.create({
            name: String(name).trim(),
            correo: correoNorm,
            passwordHash,
            edad: Number(edad),
            localidad
        });

        res.status(201).json({ name: nuevo.name, correo: nuevo.correo, edad: nuevo.edad, localidad: nuevo.localidad });
    } catch (e) {
        res.status(500).json({ message: "Error interno" });
    }
};


//VALIDAR USUARIO
const LoginUser = async (req, res) => {
    try {
        // 1) entrada (acepta "password" o "contrasena")
        const { correo, password, contrasena } = req.body || {};
        const pass = (password ?? contrasena);
        if (!correo || !pass) {
            return res.status(400).json({ message: "Correo y password son requeridos" });
        }
        const correoNorm = String(correo).trim().toLowerCase();

        // 2) traer usuario + hash (y también 'password' por si existe legado)
        const user = await Usuario
            .findOne({ correo: correoNorm })
            .select("+passwordHash password nombre correo edad"); // password por compatibilidad

        if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

        // 3) verificar
        const plain = String(pass);
        let ok = false;

        if (user.passwordHash) {
            ok = await bcrypt.compare(plain, user.passwordHash);
        } else if (user.password && typeof user.password === "string") {
            // soporte legado: password plano almacenado
            ok = (plain === user.password);
            if (ok) {
                // migrar a hash y borrar el plano
                const newHash = await bcrypt.hash(user.password, BCRYPT_COST);
                await Usuario.updateOne(
                    { _id: user._id },
                    { $set: { passwordHash: newHash }, $unset: { password: "" } }
                );
            }
        }

        if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

        // 4) emitir JWT
        const token = jwt.sign(
            { uid: user._id.toString(), correo: user.correo, nombre: user.nombre },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN, issuer: JWT_ISSUER }
        );

        return res.status(200).json({
            token,
            user: { id: user._id, nombre: user.nombre, correo: user.correo, edad: user.edad }
        });

    } catch (err) {
        console.error("Error en LoginUser:", err);
        return res.status(500).json({ message: "Error interno" });
    }
};

module.exports = { RegistroUser, LoginUser }