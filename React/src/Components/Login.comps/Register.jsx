
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
      // 1) Crear cuenta
      await api.post("/registro", form);

      // 2) Auto-login con las mismas credenciales
      const { data } = await api.post("/login", {
        email: form.email,
        password: form.password
      });

      // 3) Guardar token y user para hidratar Navbar
      localStorage.setItem("jwtToken", data.token);
      sessionStorage.setItem("me", JSON.stringify(data.user));

      setOk(true);
      // 4) Ir al Home
      navigate("/");
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
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="login-container">
            <div className="login-logo">
              <img src={logo} alt="Logo Quiero mi beca" width="100" />
              <h2 className="login-appname">Quiero mi beca</h2>
            </div>

            <h1 className="login-title">Crear cuenta</h1>

            <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-2"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>

            {error && <p className="text-danger mt-2" role="alert">{error}</p>}
            {ok && <p className="text-success mt-2">Cuenta creada. Redirigiendo…</p>}

            <p className="login-register-text mt-2">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;