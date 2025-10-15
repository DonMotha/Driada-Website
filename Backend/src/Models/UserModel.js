const { Schema, model } = require("mongoose");


// Subdocumentos
const LoginHistorySchema = new Schema(
  {
    ip: String,
    userAgent: String,
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const TwoFASchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    secretEnc: { type: String },           // secreto TOTP cifrado
    backupCodesHash: [{ type: String }]    // hashes de códigos de respaldo
  },
  { _id: false }
);

const PreferencesSchema = new Schema(
  {
    idioma: { type: String, default: "es" },
    zonaHoraria: { type: String, default: "America/Santiago" },
    notificaciones: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    privacidadPerfil: {
      mostrarNombre: { type: Boolean, default: true },
      mostrarInstitucion: { type: Boolean, default: true }
    }
  },
  { _id: false }
);

const PerfilEducativoSchema = new Schema(
  {
    tipo: { type: String, enum: ["estudiante", "docente"], default: "estudiante" },
    institucionId: { type: Schema.Types.ObjectId, ref: "Institucion" },
    carrera: String,
    nivel: { type: String },
    cursosInscritos: [{ type: Schema.Types.ObjectId, ref: "Curso" }],
    cursosImpartidos: [{ type: Schema.Types.ObjectId, ref: "Curso" }],
    promedio: Number,
    becasPostuladas: [{ type: Schema.Types.ObjectId, ref: "Beca" }],
    becasAdjudicadas: [{ type: Schema.Types.ObjectId, ref: "Beca" }]
  },
  { _id: false }
);

// Esquema principal unificado
const UsuarioSchema = new Schema(
  {
    // Identificación (acepta ambos esquemas)
    nombre: { type: String, trim: true },         // mío
    apellido: { type: String, trim: true },       // mío
    name: { type: String, trim: true },           // de tu compañera
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },

    // Email/correo (sin duplicar, normalizamos con setters)
    email: { type: String, lowercase: true, trim: true,  },
    correo: { type: String, lowercase: true, trim: true,  },

    telefono: { type: String },

    // Autenticación
    passwordHash: { type: String, select: false }, // oculto por defecto
    salt: { type: String, select: false },
    emailVerificado: { type: Boolean, default: false },
    twoFA: TwoFASchema,
    oauth: [
      {
        prov: { type: String, enum: ["google", "github", "microsoft", "facebook"] },
        sub: String,
        email: String
      }
    ],

    // Autorización
    roles: { type: [String], default: ["estudiante"], index: true },

    // Perfil público
    avatarUrl: String,
    pais: String,
    ciudad: String,
    fechaNacimiento: Date,

    // Info educacional
    perfilEducativo: PerfilEducativoSchema,

    // Preferencias
    preferencias: PreferencesSchema,

    // Campos de tu compañera
    edad: { type: Number, min: 0, max: 120 },
    localidad: { type: String },

    // Auditoría
    estado: { type: String, enum: ["activo", "suspendido", "eliminado"], default: "activo", index: true },
    ultimoLogin: Date,
    loginHistory: [LoginHistorySchema],

    // Extensión
    meta: Schema.Types.Mixed
  },
  {
    collection: "Usuario", // respeta la colección usada
    timestamps: true
  }
);

// Normalización: si alguien setea correo, también llena email (y viceversa)
UsuarioSchema.pre("save", function(next) {
  if (this.isModified("correo") && this.correo && !this.email) {
    this.email = this.correo;
  }
  if (this.isModified("email") && this.email && !this.correo) {
    this.correo = this.email;
  }
  // mapear name -> nombre si falta
  if (this.isModified("name") && this.name && !this.nombre) {
    this.nombre = this.name;
  }
  next();
});

// Índices útiles
UsuarioSchema.index({ "perfilEducativo.institucionId": 1 });
UsuarioSchema.index({ roles: 1, estado: 1 });
// Unicidad lógica por correo/email si existen
UsuarioSchema.index(
  { correo: 1 },
  { unique: true, partialFilterExpression: { correo: { $exists: true, $type: "string" } } }
)
UsuarioSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true, $type: "string" } } }
);

// Ocultación al serializar
UsuarioSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.salt;
    if (ret.twoFA) {
      delete ret.twoFA.secretEnc;
      delete ret.twoFA.backupCodesHash;
    }
    return ret;
  }
});

module.exports = model("Usuario", UsuarioSchema);
