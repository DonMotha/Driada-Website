const express = require("express");
const cors= require("cors");
const router = require("../Routes/Routes")
const morgan= require("morgan");

const app= express();

app.use(express.json());
app.use(morgan('dev'));
// orígenes permitidos (ajusta según uses 5173 o 3000)
const allowed = ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);                // curl/Postman
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ monta CORS antes de las rutas
app.use(cors(corsOptions));

app.use("/api",router)
// ❌ quita esta línea si la tenías (es la que explota)
//app.options("*", cors(corsOptions));

// ✅ si quieres cubrir preflight explícito en Express 5, usa (.*) o /api/*
//app.options("(.*)", cors(corsOptions));      // alternativa válida
// app.options("/api/*", cors(corsOptions));  // o sólo para tu prefijo API
 

module.exports = app;