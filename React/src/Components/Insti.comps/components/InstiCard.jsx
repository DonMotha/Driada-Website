import { useNavigate } from "react-router-dom";
import RatingBadge from "./RatingBadge";

export default function InstitutionCard({ item }) {
  const navigate = useNavigate();
  const go = () => navigate(`/detalle/${encodeURIComponent(item.id)}`); // ojo: detalle

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      role="button"
      onClick={go} // Permite abrir detalle clickeando en cualquier parte de la tarjeta
    >
      {/* Imagen opcional (defensivo por si aún no hay) */}
      {item.img && (
        <img
          src={item.img}
          alt={item.nombre}
          className="card-img-top object-fit-cover"
          style={{ height: 180 }}
          loading="lazy"
        />
      )}

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title fw-bold mb-1">{item.nombre}</h5>
          {/* Componente visual para la puntuación */}
          <RatingBadge value={item.puntuacion} />
        </div>

        {/* Campos opcionales; se muestran solo si existen */}
        {item?.tipo && (
          <p className="card-subtitle text-muted mb-2">{item.tipo}</p>
        )}
        {/* Botón con stopPropagation para no duplicar eventos de click */}
        <button
          className="btn btn-outline-primary fw-semibold mt-2"
          onClick={(e) => {
            e.stopPropagation(); // evita que dispare el onClick de la card
            go();
          }}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}