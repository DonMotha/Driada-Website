
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../src/Components/Login.comps/login.css";
import logo from "../../../src/assets/logo.png";

function Register() {
    const [form, setForm] = useState({ nombre: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registrar usuario", form);
        // Aquí llamas al API de registro (backend MongoDB)
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={logo} alt="Logo Quiero mi beca" width="100px" />
                <h2 className="login-appname">Quiero mi beca</h2>
            </div>

            <h1 className="login-title">Crear cuenta</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="login-btn-primary">
                    Registrarse
                </button>
            </form>

            <p className="login-register-text">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default Register;