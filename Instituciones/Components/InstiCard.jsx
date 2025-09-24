import { useNavigate } from "react-router-dom";
import RatingBadge from "./RatingBadge";

export default function InstitutionCard({ item }) {
  const navigate = useNavigate();
  const go = () => navigate(`/detalle/${encodeURIComponent(item.id)}`); // ojo: detalle

  return (
    <div className="institution-card card border-0 shadow-sm h-100" role="button" onClick={go}>
      {item.img && (
        <img
          src={item.img}
          className="card-img-top object-fit-cover"
          alt={item.nombre}
          style={{ height: 180 }}
          onError={(e)=>{ e.currentTarget.style.display = "none"; }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title fw-bold d-flex justify-content-between align-items-start">
          <span>{item.nombre}</span>
          <RatingBadge value={item.rating} />
        </h5>
        <p className="card-subtitle text-muted mb-2">{item.tipo} • {item.ciudad}</p>
        <p className="card-text">{item.desc}</p>
        <button className="btn btn-outline-primary fw-semibold mt-2"
                onClick={(e)=>{ e.stopPropagation(); go(); }}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}