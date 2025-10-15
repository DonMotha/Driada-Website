const jwt = require("jsonwebtoken")
const Usuario = require("../Models/UserModel")
const bcrypt = require("bcrypt")

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_ISSUER = "Driada-Website";
const BCRYPT_COST = parseInt(process.env.BCRYPT_COST || "12", 10);

// helper firma
const signJwt = (payload, opts = {}) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, issuer: JWT_ISSUER, ...opts });

// POST /api/users/register  y /api/registro
const RegistroUser = async (req, res, next) => {
    try {
        const {
            email,
            correo,
            password,
            contrasena,
            nombre,
            name,
            apellido,
            username,
            edad,
            localidad
        } = req.body || {};

        const correoNorm = String(correo || email || "").trim().toLowerCase();
        if (!correoNorm) return res.status(400).json({ error: "Email/correo requerido" });

        const exists = await Usuario.exists({ $or: [{ correo: correoNorm }, { email: correoNorm }] });
        if (exists) return res.status(409).json({ error: "Correo ya registrado" });

        const passPlain = (password ?? contrasena) || undefined;
        const passwordHash = passPlain ? await bcrypt.hash(String(passPlain).trim(), BCRYPT_COST) : undefined;

        const user = await Usuario.create({
            correo: correoNorm,
            email: correoNorm,
            passwordHash,
            nombre: (nombre || name || "").trim() || undefined,
            apellido: (apellido || "").trim() || undefined,
            username: (username || "").trim() || undefined,
            edad: (edad != null ? Number(edad) : undefined),
            localidad: localidad,
            perfilEducativo: { tipo: "estudiante" }
        });

        res.status(201).json({
            id: user._id,
            correo: user.correo,
            email: user.email,
            nombre: user.nombre || user.name,
            edad: user.edad,
            localidad: user.localidad
        });
    } catch (err) {
        next ? next(err) : res.status(500).json({ error: "Error interno" });
    }
};

// POST /api/users/login  y /api/login
const LoginUser = async (req, res, next) => {
    try {
        const { correo, email, password, contrasena, otp } = req.body || {};
        const correoNorm = String(correo || email || "").trim().toLowerCase();
        const pass = password ?? contrasena;
        if (!correoNorm || !pass) return res.status(400).json({ error: "Correo y password requeridos" });

        // Traer usuario incluyendo passwordHash y, por compatibilidad, un posible "password" legacy
        const user = await Usuario.findOne({ $or: [{ correo: correoNorm }, { email: correoNorm }] })
            .select("+passwordHash password nombre correo email edad roles twoFA");

        if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

        // verificar
        const plain = String(pass);
        let ok = false;

        if (user.passwordHash) {
            ok = await bcrypt.compare(plain, user.passwordHash);
        } else if (user.password && typeof user.password === "string") {
            ok = (plain === user.password);
            if (ok) {
                // Migrar a hash y remover password plano
                const newHash = await bcrypt.hash(user.password, BCRYPT_COST);
                await Usuario.updateOne({ _id: user._id }, { $set: { passwordHash: newHash }, $unset: { password: "" } });
            }
        }
        if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

        // 2FA opcional (placeholder; no bloquea si no está configurado)
        if (user.twoFA?.enabled) {
            if (!otp) return res.status(401).json({ error: "Se requiere OTP" });
            // TODO: validar TOTP con secretEnc desencriptado
        }

        // auditoría
        user.ultimoLogin = new Date();
        user.loginHistory = user.loginHistory || [];
        user.loginHistory.push({
            ip: req.ip,
            userAgent: req.headers["user-agent"] || "unknown"
        });
        await user.save();

        // payload: compat con ambos middlewares
        const token = signJwt({
            sub: user._id.toString(),
            roles: user.roles || ["estudiante"],
            uid: user._id.toString(),
            correo: user.correo || user.email,
            nombre: user.nombre || user.name
        });

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                correo: user.correo,
                email: user.email,
                roles: user.roles,
                nombre: user.nombre || user.name,
                edad: user.edad
            }
        });
    } catch (err) {
        next ? next(err) : res.status(500).json({ error: "Error interno" });
    }
};

// GET /api/users/me y /api/me (con requireAuth)
const me = async (req, res, next) => {
    try {
        const id = req.userId || req.user?.uid || req.user?.sub;
        if (!id) return res.status(401).json({ error: "No autenticado" });

        const user = await Usuario.findById(id).select("-passwordHash -salt -twoFA.secretEnc -twoFA.backupCodesHash");
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json(user);
    } catch (err) {
        next ? next(err) : res.status(500).json({ error: "Error interno" });
    }
};

module.exports = { RegistroUser, LoginUser, me }