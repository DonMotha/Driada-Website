// Home.comps/components/Cards.jsx
export default function Card({ inst }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="ratio ratio-1x1" style={{ background: "#f3f6fb" }}>
        <img
          src={inst.img || '/placeholder-insti.png'}
          alt={inst.nombre || 'Institución'}
          loading="lazy"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          onError={(e) => { e.currentTarget.src = '/placeholder-insti.png'; }}
        />
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{inst.nombre}</h5>
          {inst.puntuacion != null && (
            <span className="badge bg-primary-subtle text-primary fw-semibold">
              {Number(inst.puntuacion).toFixed(1)}
            </span>
          )}
        </div>
        <p className="card-text text-muted small mb-0">{inst.tipo}</p>
        <a
          className="btn btn-outline-primary btn-sm mt-3"
          href={`/detalle/${inst.id}`}
        >
          Ver más
        </a>
      </div>
    </div>
  );
}
