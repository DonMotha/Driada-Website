import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const go = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="#" onClick={(e)=>go(e,"/")}>
          Quiero mi beca
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Inicio */}
            <li className="nav-item">
              <a className="nav-link active fw-semibold" href="/" onClick={(e)=>go(e,"/")}>
                Inicio
              </a>
            </li>

            {/* Instituciones */}
            <li className="nav-item">
              <a
                className="nav-link"        /* ← quitamos la 's' suelta */
                href="/instituciones"
                onClick={(e) => go(e, "/instituciones")}
              >
                Instituciones
              </a>
            </li>

            {/* Buscar (déjalo en # hasta que tengas ruta) */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e)=>e.preventDefault()}>
                Buscar
              </a>
            </li>

            {/* Contacto */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e)=>e.preventDefault()}>
                Contacto
              </a>
            </li>

            {/* Iniciar sesión */}
            <li className="nav-item">
              <a className="btn btn-primary text-white fw-semibold ms-3" href="#" onClick={(e)=>e.preventDefault()}>
                Iniciar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
