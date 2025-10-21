
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import "../../../src/Components/Login.comps/login.css";
import logo from "../../../src/assets/logo.png";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      setError("");
    try {
      const { data } = await api.post("/login", { email, password });
      localStorage.setItem("jwtToken", data.token);
      sessionStorage.setItem("me", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Credenciales inválidas";
      setError(msg);
      console.error("Login failed:", err);
    }
  };

  // Login.jsx (solo el layout exterior)
return (
  <div className="container-fluid py-5 bg-light">
    <div className="row align-items-center min-vh-75">
      {/* Izquierda: background con ilustración (no empuja el layout) */}
      <div className="col-12 col-lg-6 d-none d-lg-block">
        <div className="login-hero h-100 d-flex flex-column justify-content-center ps-5">
          <h2 className="display-6 fw-bold mb-3">Encuentra tu beca ideal</h2>
          <p className="text-muted mb-4">Explora instituciones, carreras y beneficios.</p>
          <img src={logo} alt="Ilustración" className="img-fluid hero-illustration" />
          
        </div>
      </div>

      {/* Derecha: formulario */}
      <div className="col-12 col-lg-5">
        <div className="login-container ms-lg-5">
          <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => navigate("/")}
                >
                  Entrar sin cuenta
                </button>
              </div>
            </form>
            {error && <p className="text-danger mt-2" role="alert">{error}</p>}
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;