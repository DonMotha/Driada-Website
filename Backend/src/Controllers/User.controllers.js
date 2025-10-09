const jwt = require("jsonwebtoken")
const Usuario = require("../Models/UserModel")
const bcrypt = require("bcrypt")

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_ISSUER = "Driada-Website";
const BCRYPT_COST = parseInt(process.env.BCRYPT_COST || "12", 10);

//Registro de usuario
const RegistroUser = async(req,res)=>{
    try{
        const {nombre,correo,password,edad,localidad} = req.body ||{};

        if (!nombre || !correo || !password || !localidad || edad === undefined || edad===null){
            return  res.status(400).json({message:"Debe ingresar todas los requerimientos"})
        }

        const correoNormal = String(correo).trim().toLowerCase()
        const nombreNormal = String(nombre).trim()
        const edadNum = Number(edad)
        const ubicacion = String(localidad)

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(correo))
            return res.status(400).json({message: "Correo invalido"})

        if (!Number.isFinite(edadNum) || edadNum<0 || edadNum>120)
            return res.status(400).json({message:"Edad invalida"})

        if (String(password).length <8)
            return res.status(400).json({message:"El password debe tener al menos 8 caracteres"})

        const yaexiste = await Usuario.exists({correo:correoNormal})
        if(yaexiste)
            return res.status(409).json({message: "El correo ya existe"})

        const passwordHash = await bcrypt.hash(String(password),12)

        const nuevo = await Usuario.create({
            name:nombreNormal,
            correo:correoNormal,
            passwordHash,
            edad:edadNum,
            localidad:ubicacion
        })

        return res.status(201).json({
            nombre:nuevo.name,
            correo: nuevo.correo,
            edad: nuevo.edad,
            localidad : nuevo.localidad,
            createdAt: nuevo.createdAt
        })
        

    }catch (err){
        if (err && err.code === 1100 && err.keyPattern?.correo)
            return res.status(409),json({message: "El correo ya esta registrado"})

        console.error("Error en RegistroUser",err)
        return res.status(500).json({message:"Error interno"})
    }
}

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

module.exports = {RegistroUser,LoginUser}