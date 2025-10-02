
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../src/Components/Login.comps/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // aqui se conecta el backend (API login)
        console.log("Login con", email, password);

        // Simulacion -> luego validar con token real
        localStorage.setItem("token", "falso-jwt");
        navigate("/"); // redirigirte al Home
    };

    return (
        <div className="login-container">
            {/* Logo */}
            <div className="login-logo">
                <img src="/images/logo.png" alt="Logo Quiero mi beca" width={"100px"} />
                <h2 className="login-appname">Quiero mi beca</h2>
            </div>

            <h1 className="login-title">Iniciar Sesión</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <input className="d-flex flex-column align-items-center w-75 mx-auto"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input className="d-flex flex-column align-items-center w-75 mx-auto"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary d-flex flex-column align-items-center w-50 mx-auto">
                    Iniciar Sesión
                </button>
                <button
                    type="button"
                    className="btn-secondary d-flex flex-column align-items-center w-50 mx-auto"
                    onClick={() => navigate("/")}
                >
                    Entrar sin cuenta
                </button>
            </form>

            <p className="login-divider">O continúa con</p>

            {/* Redes sociales */}
            <div className="login-social">
                <button><img src="/images/icono-tele.svg" alt="Telegram" /></button>
                <button><img src="/images/icono-fb.svg" alt="Facebook" /></button>
                <button><img src="/images/icono-linke.svg" alt="LinkedIn" /></button>
            </div>

            {/* Registro */}
            <p className="login-register-text">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
        </div>
    );
}

export default Login;