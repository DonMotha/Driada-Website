

function Footer() {
    return (
        
        <footer className="py-5 text-white" >
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-4 mb-3">
                        <h5>Información</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50 text-decoration-none">Preguntas frecuentes</a></li> 
                            <li><a href="#" className="text-white-50 text-decoration-none">Términos y condiciones</a></li> 
                            <li><a href="#" className="text-white-50 text-decoration-none">Política de privacidad</a></li> 
                        </ul>
                    </div>


                    <div className="col-md-4 mb-3 text-center">
                        <h5></h5>
                        <small className="text-white-50"></small>
                    </div>



                    <div className="col-md-4 mb-3 text-end">
                        <h5>Síguenos</h5>
                        <a href="#" className="text-white fs-4 me-3"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-white fs-4 me-3"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="text-white fs-4"><i className="bi bi-whatsapp"></i></a>
                    </div>
                </div>
                <hr className="hr-soft"/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0">&copy;  2025 Dirada. Todos los derechos reservados.</p>
                        </div>
                    </div>
            </div>
        </footer >
        
    )
}

export default Footer