import { Link } from "react-router-dom";




function Card() {
    return (
        <div className="col-md-4">
            <div className="card institution-card h-100" data-url="detalle.html?id=1">
                <img src="imagenes/instituto1.jpg" className="card-img-top" alt="Instituto" />
                <span className="rating-badge">⭐ 4.2</span>
                <div className="card-body">
                    <h5 className="card-title fw-semibold">Instituto Tecnológico Superior</h5>
                    <p className="card-text">Formación técnica de alta calidad para el desarrollo
                    profesional.</p>
                    <p className="text-muted small mb-0">📍 Santiago, Chile</p>
                    <Link to="/detalle/1" className="btn btn-outline-primary mt-2">Ver más</Link>
                </div>
            </div>
        </div>
    )
}

export default Card