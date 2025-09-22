


function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-white shadow-sm ">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="#"> Quiero mi beca</a> 
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active fw-semibold" href="#">Inicio</a></li> 
                    <li class="nav-item"><a class="nav-link" href="#">Instituciones</a></li> 
                    <li class="nav-item"><a class="nav-link" href="#">Buscar</a></li> 
                    <li class="nav-item"><a class="nav-link" href="#">Contacto</a></li> 
                    <li class="nav-item"><a class="btn btn-primary text-white fw-semibold ms-3" href="#">Iniciar sesión</a></li> 
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;