import { Link } from "react-router-dom";
import RatingBadge from "./RatingBadge";




function Card({item}) {
    if (!item) return null; // 👈 evita render si no hay props
    return (
        <div className="col-6 col-md-4">
            <div className="card institution-card h-100" data-url="detalle.html?id=1">
                <img
                    src={item.img}
                    className="institution-card-img-top"
                    alt={item.nombre}
                    onError={(e) => { e.currentTarget.src = "/imagenes/default.png"; }} // backup
                />
                <div className="card-body">
                    <h5 className="card-title fw-semibold d-flex justify-content-between">
                        {item.nombre}
                        <RatingBadge value={item.rating} />
                    </h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="text-muted small mb-0">📍 {item.ciudad}</p>
                    <Link to={`/detalle/${item.id}`} className="btn btn-outline-primary mt-2">
                        Ver más
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card