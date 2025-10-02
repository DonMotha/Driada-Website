import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import '../../../src/Components/Nav.comps/Nav.css'

function Navbar() {
  const navigate = useNavigate();
  const go = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-primary d-flex align-items-cente" href="#" onClick={(e)=>go(e,"/")}>
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
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
                className="nav-link"      
                href="/instituciones"
                onClick={(e) => go(e, "/instituciones")}
              >
                Instituciones
              </a>
            </li>

             {/*Becas y carreras */}
            <li className="nav-item">
              <a
                className="nav-link"        
                href="/becasycarreras"
                onClick={(e) => go(e, "/becasycarreras")}
              >
                Becas/Carreras
              </a>
            </li>

            {/* Contacto */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e)=>e.preventDefault()}>
                Contacto
              </a>
            </li>

            {/* Iniciar sesión */}
            {/*<li className="nav-item">
              <Link to="/login" className="btn btn-primary text-white fw-semibold ms-3"  onClick={(e)=>e.preventDefault()}>
                Iniciar sesión 
              </Link>
            </li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
