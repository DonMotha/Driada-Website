// Home.comps/components/Instituciones.jsx
import { useEffect, useMemo, useState } from "react";
import { fetchInstitucionesPrevias } from "../../../api/instituciones";
import Card from "./Cards";

function chunkArray(array, size) {
  const res = [];
  for (let i = 0; i < array.length; i += size) res.push(array.slice(i, i + size));
  return res;
}

export default function Instituciones() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchInstitucionesPrevias();
        if (!rows.length) {
          setStatus("empty");
          return;
        }
        setItems(
          rows.map((d) => ({
            id: String(d._id ?? d.id ?? ""),
            nombre: d.nombre ?? d.Nombre ?? "—",
            tipo: d.tipo ?? d.Tipo ?? "Institución",
            puntuacion: d.puntuacion ?? d.Puntuacion ?? null,
            img: normalizeUrl(d.img ?? d.Img ?? null),
          }))
        );
        setStatus("ok");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  function normalizeUrl(u) {
  if (!u) return null;
  try {
    const url = new URL(u);
    if (url.protocol === "http:") url.protocol = "https:";
    return url.toString();
  } catch {
    return null;
  }
}


  const grupos = useMemo(() => chunkArray(items, 3), [items]);

  return (
    <section className="institutions py-5 bg-white">
      <div className="container">
        <h2 className="text-center fw-bold">
          Instituciones y fundaciones destacadas
        </h2>
        <p className="text-center text-muted mb-5">
          Descubre las mejores oportunidades educativas en instituciones
          reconocidas.
        </p>

        {status === "loading" && <p className="text-center">Cargando…</p>}
        {status === "empty" && <p className="text-center">No hay datos.</p>}
        {status === "error" && (
          <p className="text-center text-danger">Error al cargar datos.</p>
        )}

        {status === "ok" && (
          <div
            id="institutionsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {grupos.map((grupo, idx) => (
                <div
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  key={idx}
                >
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {grupo.map((inst) => (
                      <div className="col" key={inst.id}>
                        <Card inst={inst} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {grupos.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#institutionsCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#institutionsCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

