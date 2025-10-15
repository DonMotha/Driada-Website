
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import "../../../src/Components/Login.comps/login.css";
import logo from "../../../src/assets/logo.png";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="login-container">
            <div className="login-logo">
              <img src={logo} alt="Logo Quiero mi beca" width="100" />
              <h2 className="login-appname">Quiero mi beca</h2>
            </div>

            <h1 className="login-title">Iniciar Sesión</h1>

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

            <p className="login-register-text mt-2">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;