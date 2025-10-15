import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCarreraById } from "../../api/carreras";
import { fetchInstituciones } from "../../api/instituciones";
import "./Carreras.css"
const pick = (obj, ...keys) => keys.map(k => obj?.[k]).find(v => v !== undefined && v !== null);

function normalizeCarrera(raw = {}) {
  const id = String(pick(raw, "_id", "id") ?? "");
  const nombre = pick(raw, "nombre", "Nombre", "NOMBRE") ?? "Carrera";
  const tipo = pick(raw, "tipo", "Tipo", "TIPO") ?? "Carrera";
  const descripcion = pick(raw, "descripcion", "Descripcion", "DESCRIPCION") ?? "";

  const area = pick(raw, "area", "Area", "AREA");
  const empleabilidad = pick(raw, "empleabilidad", "Empleabilidad", "EMPLEABILIDAD");
  const sueldo = pick(raw, "sueldopromedio", "SueldoPromedio", "SUELDOPROMEDIO");

  const universidades = pick(raw, "universidades_ids", "Universidades_ids", "UNIVERSIDADES_IDS") ?? [];
  return { id, nombre, tipo, descripcion, area, empleabilidad, sueldo, universidades };
}

export default function DetalleCarrera() {
  const { id } = useParams();
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // instituciones resueltas a {id, nombre, img?}
  const [insts, setInsts] = useState([]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    fetchCarreraById(id)
      .then((d) => alive && setRaw(d))
      .catch((e) => setErr(e?.message || "Error al cargar la carrera"))
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [id]);

  const carrera = useMemo(() => (raw ? normalizeCarrera(raw) : null), [raw]);

  // Resolver instituciones: usa populate si viene; si son IDs, hace fetch por cada una.
  useEffect(() => {
    let alive = true;
    if (!carrera) return;

    const arr = carrera.universidades;
    if (!Array.isArray(arr) || !arr.length) {
      setInsts([]);
      return;
    }

    // Si ya vienen pobladas (objetos con Nombre), usamos eso
    const populated = arr.filter((x) => typeof x === "object");
    const base = populated.map((u) => ({
      id: String(pick(u, "_id", "id") ?? ""),
      nombre: pick(u, "Nombre", "nombre") ?? null,
      img: pick(u, "img", "Img") ?? null,
    }));

    const ids = arr
      .filter((x) => typeof x !== "object")
      .map((v) => String(v))
      .filter(Boolean);

    setInsts(base);

    if (!ids.length) return;

    Promise.all(ids.map((iid) => fetchInstituciones(iid).catch(() => null)))
      .then((res) => {
        if (!alive) return;
        const extra = res
          .filter(Boolean)
          .map((d) => ({
            id: String(d._id ?? d.id),
            nombre: d.Nombre ?? d.nombre ?? null,
            img: d.img ?? d.Img ?? null,
          }));
        // Unimos evitando duplicados por id
        const all = [...base, ...extra].filter(
          (item, idx, arr) => arr.findIndex((x) => x.id === item.id) === idx
        );
        setInsts(all);
      })
      .catch(() => {});

    return () => { alive = false; };
  }, [carrera]);

  if (loading) return <div className="container py-5">Cargando…</div>;
  if (err) return <div className="container py-5 text-danger">{err}</div>;
  if (!carrera) return null;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h1 className="fw-bold m-0">{carrera.nombre}</h1>
        <span className="badge text-bg-secondary">{carrera.tipo}</span>
      </div>

      {carrera.descripcion && <p className="lead">{carrera.descripcion}</p>}

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Información</h5>
              {carrera.area && <p className="mb-1"><strong>Área:</strong> {carrera.area}</p>}
              {carrera.empleabilidad && <p className="mb-1"><strong>Empleabilidad:</strong> {String(carrera.empleabilidad)}%</p>}
              {carrera.sueldo && (
                <p className="mb-1">
                  <strong>Sueldo promedio:</strong>{" "}
                  ${Number(carrera.sueldo).toLocaleString("es-CL")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold">Instituciones que la imparten</h5>
              {!insts.length && <p className="mb-0 text-muted">No registradas</p>}
              {!!insts.length && (
                <ul className="mb-0">
                  {insts.map((u) => (
                    <li key={u.id} className="mb-1">
                      {u.img && (
                        <img
                          src={u.img}
                          alt={u.nombre || "Institución"}
                          style={{ width: 28, height: 28, objectFit: "cover" }}
                          className="me-2 rounded"
                        />
                      )}
                      <Link to={`/instituciones/${u.id}`}>{u.nombre || u.id}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Debug opcional */}
      {/* <pre className="bg-light p-3 rounded border mt-4">{JSON.stringify(raw, null, 2)}</pre> */}
    </div>
  );
}
