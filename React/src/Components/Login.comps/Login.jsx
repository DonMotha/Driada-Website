
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import "../../../src/Components/Login.comps/login.css";
import logo from "../../../src/assets/logo.png";
import tele from "../../../src/assets/icono-tele.svg";
import fb from "../../../src/assets/icono-fb.svg";
import linke from "../../../src/assets/icono-linke.svg";

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
      // data: { token, user }
      localStorage.setItem("jwtToken", data.token);
      // Opcional: guardar user en sessionStorage si quieres hidratar rápido
      sessionStorage.setItem("me", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Credenciales inválidas";
      setError(msg);
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo Quiero mi beca" width={"100px"} />
        <h2 className="login-appname">Quiero mi beca</h2>
      </div>

      <h1 className="login-title">Iniciar Sesión</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input className="d-flex flex-column align-items-center w-75 mx-auto"
          type="email" placeholder="Correo electrónico"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="d-flex flex-column align-items-center w-75 mx-auto"
          type="password" placeholder="Contraseña"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary d-flex flex-column align-items-center w-50 mx-auto">
          Iniciar Sesión
        </button>
        <button type="button" className="btn-secondary d-flex flex-column align-items-center w-50 mx-auto"
          onClick={() => navigate("/")}>
          Entrar sin cuenta
        </button>
      </form>

      {error && <p className="text-danger mt-2" role="alert">{error}</p>}

      <p className="login-divider">O continúa con</p>
      <div className="login-social">
        <button><img src={tele} alt="Telegram" /></button>
        <button><img src={fb} alt="Facebook" /></button>
        <button><img src={linke} alt="LinkedIn" /></button>
      </div>

      <p className="login-register-text">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;