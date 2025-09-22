


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
        <div className="container">
            <a className="navbar-brand fw-bold text-primary" href="#"> Quiero mi beca</a> 
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link active fw-semibold" href="#">Inicio</a></li> 
                    <li className="nav-item"><a className="nav-link" href="#">Instituciones</a></li> 
                    <li className="nav-item"><a className="nav-link" href="#">Buscar</a></li> 
                    <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li> 
                    <li className="nav-item"><a className="btn btn-primary text-white fw-semibold ms-3" href="#">Iniciar sesión</a></li> 
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;