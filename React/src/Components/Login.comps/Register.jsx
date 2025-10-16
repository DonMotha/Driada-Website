
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
    <div className="container-fluid py-5 bg-light">
      <div className="row align-items-center min-vh-75">
        {/* Columna izquierda: texto + imagen controlada */}
        <div className="col-12 col-lg-6 d-none d-lg-block">
          <div className="login-hero h-100 d-flex flex-column justify-content-center ps-5">
            <h2 className="display-6 fw-bold mb-3">Crea tu cuenta</h2>
            <p className="text-muted mb-4">
              Guarda instituciones y carreras favoritas, y recibe recordatorios de postulaciones.
            </p>
            <img src={logo} alt="Ilustración registro" className="img-fluid hero-illustration" />
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="col-12 col-lg-5">
          <div className="login-container ms-lg-5">
            
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
                <div className="d-flex gap-2">
                  <button type="submit" className="btn      btn-primary w-100">
                    Registrarse
                  </button>
                </div>
                </form>

                {error && (
                  <p className="text-danger mt-2" role="alert">
                    {error}
                  </p>
                )}
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