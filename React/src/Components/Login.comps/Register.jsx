
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import "../../../src/Components/Login.comps/login.css";
import logo from "../../../src/assets/logo.png";

function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    try {
      await api.post("/registro", form);
      setOk(true);
      // Espera breve para que el usuario vea el mensaje, o navega directo
      setTimeout(() => navigate("/login"), 600);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.error || err.response?.data?.message;
      if (status === 409) setError("Este correo ya está registrado.");
      else if (status === 400) setError(msg || "Datos inválidos");
      else setError("No se pudo registrar. Intenta más tarde.");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo Quiero mi beca" width="100px" />
        <h2 className="login-appname">Quiero mi beca</h2>
      </div>

      <h1 className="login-title">Crear cuenta</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit" className="login-btn-primary">Registrarse</button>
      </form>

      {error && <p className="text-danger mt-2" role="alert">{error}</p>}
      {ok && <p className="text-success mt-2">Cuenta creada. Redirigiendo…</p>}

      <p className="login-register-text">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Register;