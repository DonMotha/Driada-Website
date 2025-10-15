// ./components/Becas-Grid.jsx
import { Link } from "react-router-dom";

export default function BecasGrid({
  items = [],
  emptyText = "Sin resultados",
}) {
  if (!items.length) {
    return <p className="text-center text-muted py-5">{emptyText}</p>;
  }

  return (
    <div className="row g-3">
      {items.map((it) => {
        const to = it.kind === "beca" ? `/becas/${it.id}` : `/carreras/${it.id}`;
        const desc = it.descripcion ?? it.desc ?? "";

        return (
          <div className="col-12 col-md-6 col-lg-4" key={`${it.kind}-${it.id}`}>
            {/* El Link envuelve TODA la card: navega al hacer click, 
               pero no se dispara mientras seleccionas texto */}
            <Link
              to={to}
              className="text-reset text-decoration-none d-block h-100"
            >
              <article className="card h-100 border-0 shadow-sm preview-card position-relative">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start card-title-row">
                    <h5 className="fw-bold mb-1 text-truncate">
                      {it.nombre || "—"}
                    </h5>
                    <span className="badge text-bg-secondary ms-2">
                      {it.tipo || (it.kind === "beca" ? "Beca" : "Carrera")}
                    </span>
                  </div>

                  {desc ? (
                    <p className="mb-0 desc">{desc}</p>
                  ) : (
                    <p className="mb-0 text-muted">—</p>
                  )}
                </div>
              </article>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
