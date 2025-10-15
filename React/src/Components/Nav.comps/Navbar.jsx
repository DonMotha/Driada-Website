//import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
//import logo from "../../../src/assets/logo.png";
import '../../../src/Components/Nav.comps/Nav.css'

function Navbar() {
  const [user, setUser] = useState(() => {
    try {
      const cached = sessionStorage.getItem("me");
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setUser(null);
      return;
    }
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get("/me");
        if (alive) {
          setUser(data.user || data);
          sessionStorage.setItem("me", JSON.stringify(data.user || data));
        }
      } catch {
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("me");
        if (alive) setUser(null);
      }
    })();
    return () => { alive = false; };
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("me");
    setUser(null);
    // opcional: window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <a className="navbar-brand text-primary fw-bold" href="/">Quiero mi beca</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/instituciones">Instituciones</a></li>
            <li className="nav-item"><a className="nav-link" href="/becas">Becas/Carreras</a></li>
            <li className="nav-item"><a className="nav-link" href="/contacto">Contacto</a></li>
          </ul>

          {!user ? (
            <div className="d-flex gap-2">
              <a className="btn btn-outline-primary btn-sm" href="/login">Iniciar sesión</a>
              <a className="btn btn-primary btn-sm" href="/registro">Registrarse</a>
            </div>
          ) : (
            <div className="dropdown">
              <button className="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                {user.nombre || user.name || "Usuario"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="/me">Mi perfil</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={logout}>Salir</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
