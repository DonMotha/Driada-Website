//import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
//import logo from "../../../src/assets/logo.png";
import '../../../src/Components/Nav.comps/Nav.css'

function Avatar({ user, size = 28 }) {
  const name = user?.nombre || user?.name || user?.email || "U";
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  const style = { width: size, height: size, borderRadius: "50%", objectFit: "cover" };

  if (user?.avatarUrl) {
    // Si avatarUrl es relativo (p.ej. /uploads/avatars/xxx.jpg), compón base de backend quitando /api
    const API = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api$/, "");
    const src = user.avatarUrl.startsWith("http") ? user.avatarUrl : API + user.avatarUrl;
    return <img src={src} alt={name} style={style} />;
  }
  return (
    <div style={{
      ...style, background: "#1062FE", color: "#fff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 600
    }}>
      {initials}
    </div>
  );
}

function Navbar() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("me")) || null; } catch { return null; }
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) { setUser(null); return; }
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get("/me");
        const me = data.user || data;
        if (alive) {
          setUser(me);
          sessionStorage.setItem("me", JSON.stringify(me));
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
    window.location.href = "/"; // fuerza refresco de navbar si hace falta
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
            <li className="nav-item"><a className="nav-link" href="/becasycarreras">Becas/Carreras</a></li>
            <li className="nav-item"><a className="nav-link" href="/contacto">Contacto</a></li>
          </ul>

          {!user ? (
            <div className="d-flex gap-2">
              <a className="btn btn-outline-primary btn-sm" href="/login">Iniciar sesión</a>
              <a className="btn btn-primary btn-sm" href="/registro">Registrarse</a>
            </div>
          ) : (
            <div className="dropdown">
              <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 dropdown-toggle" data-bs-toggle="dropdown">
                <Avatar user={user} size={28} />
                <span>{user.nombre || user.name || user.email}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="/perfil">Mi perfil</a></li>
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
