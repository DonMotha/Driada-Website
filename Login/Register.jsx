
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

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
            <div className="logo">
                <img src="/images/logo.png" alt="Logo Quiero mi beca" width="100px" />
                <h2 className="app-name">Quiero mi beca</h2>
            </div>

            <h1 className="title">Crear cuenta</h1>

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
                <button type="submit" className="btn-primary">
                    Registrarse
                </button>
            </form>

            <p className="register-text">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default Register;