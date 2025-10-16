<<<<<<< HEAD
import { useState, useEffect } from 'react'
import '../../../src/Components/Perfi.becas.comps/Beca.css'
=======
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBecaById } from "../../api/becas";
import { fetchInstituciones } from "../../api/instituciones";
import "./Beca.css"
// Util: toma el primer campo definido
const pick = (obj, ...keys) => keys.map(k => obj?.[k]).find(v => v !== undefined && v !== null);
>>>>>>> 2b6811c9aa64a56ee3335ea1708693479a24726b

// Normaliza la beca (tolerante a MAYÚSCULAS/minúsculas)
function normalizeBeca(raw = {}) {
  const id = String(pick(raw, "_id", "id") ?? "");
  const nombre = pick(raw, "nombre", "Nombre") ?? "Beca";
  const tipo = pick(raw, "tipo", "Tipo") ?? "Beca";
  const descripcion = pick(raw, "descripcion", "Descripcion", "DESCRIPCION") ?? "";

  const activa = pick(raw, "activa", "Activa");
  const modalidad = pick(raw, "modalidad", "Modalidad");
  const duracion = pick(raw, "duracion", "Duracion");
  let areas = pick(raw, "areas", "Areas", "area", "Area");
  if (typeof areas === "string") areas = [areas];
  if (!Array.isArray(areas)) areas = [];

<<<<<<< HEAD
    useEffect(() => {
        fetch('http://localhost:4000/api/becas/68b75717aa6af0866f95d2ca')
            .then(Response => {
                if (!Response.ok) {
                    throw new Error('Error al cargar el archivo JSON')
                }
                return Response.json()
            })
            .then(json => {
                setBeca(json)
                setError(null)
            })
            .catch((error) => {
                console.log("Error en fetch", error)
                setError(error.message)
                setBeca(null)
            })

            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className='container my-5 text-center'><p>Cargando beca...</p></div>

    if (error) return <div className='container my-5 text-center'><p>Error: {error}</p></div>

    if (!beca) return <div className='container my-5 text-center'><p>No se encontraron datos de la beca</p></div>

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


    return (
        <>
            <div className="beca-container">
                <div className="row">
                    <div className="beca-image col-sm-3">
                        <img
                            src={normalizeUrl(beca.img) || "#"}
                            className="img-fluid"
                            style={{ borderRadius: "8px" }}
                            alt="Beca"
                        />
                    </div>

                    <div className=" col-sm-8">
                        <div className="beca-subtitle">{beca.institucionId || "Institución no disponible"}</div>
                        <h1 className="beca-title">{beca.nombre || "Nombre no disponible"}</h1>

                        <div className="beca-tags">
                            <div className="beca-tag"> {beca.areas || "Área no especificada"} </div>
                            <div className="beca-tag"> RSH: {beca.requisitos?.RSH}% </div>
                            <div className="beca-tag"> PAES: {beca.requisitos?.puntaje} </div>
                        </div>
                    </div>
                </div>

                <div className="beca-section-title">Acerca de esta beca</div>
                <p className="beca-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum placeat dicta laborum autem neque amet beatae? Commodi similique ullam neque, ab quos sapiente quo, repudiandae aspernatur autem amet dolore.
                </p>
                <p className="beca-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illum nobis error laboriosam quis? Nulla, itaque vitae consequuntur libero distinctio ratione tenetur, dolores laborum eveniet recusandae corrupti aperiam dolorem accusantium.
                </p>

                <a href="#" className='beca-button'>Ver convocatoria</a>

            </div>
        </>
    )
=======
  const inst = pick(raw, "institutionId", "InstitutionId", "institucion", "Institucion");
  const institution =
    inst && typeof inst === "object"
      ? {
          id: String(pick(inst, "_id", "id") ?? ""),
          nombre: pick(inst, "Nombre", "nombre") ?? null,
          img: pick(inst, "img", "Img") ?? null,
          link: pick(inst, "link", "Link") ?? null,
        }
      : inst
      ? { id: String(inst), nombre: null }
      : null;

  return { id, nombre, tipo, descripcion, activa, modalidad, duracion, areas, institution };
>>>>>>> 2b6811c9aa64a56ee3335ea1708693479a24726b
}

export default function DetalleBeca() {
  const { id } = useParams();
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Si la beca trae solo el id de la institución, resolvemos el nombre con un fetch
  const [instResolved, setInstResolved] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    fetchBecaById(id)
      .then((d) => alive && setRaw(d))
      .catch((e) => setErr(e?.message || "Error al cargar la beca"))
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [id]);

  const beca = useMemo(() => (raw ? normalizeBeca(raw) : null), [raw]);

  // Resolver institución si no viene poblada
  useEffect(() => {
    let alive = true;
    if (beca?.institution?.id && !beca.institution.nombre) {
      fetchInstituciones(beca.institution.id)
        .then((d) => {
          if (!alive || !d) return;
          setInstResolved({
            id: String(d._id ?? d.id ?? beca.institution.id),
            nombre: d.Nombre ?? d.nombre ?? null,
            img: d.img ?? d.Img ?? null,
          });
        })
        .catch(() => {});
    }
    return () => { alive = false; };
  }, [beca?.institution?.id, beca?.institution?.nombre]);

  if (loading) return <div className="container py-5">Cargando…</div>;
  if (err) return <div className="container py-5 text-danger">{err}</div>;
  if (!beca) return null;

  const inst = beca.institution
    ? { ...beca.institution, ...instResolved }
    : null;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h1 className="fw-bold m-0">{beca.nombre}</h1>
        <span className="badge text-bg-primary">{beca.tipo}</span>
      </div>

      {typeof beca.activa === "boolean" && (
        <p className={`badge ${beca.activa ? "text-bg-success" : "text-bg-secondary"}`}>
          {beca.activa ? "Activa" : "No activa"}
        </p>
      )}

      {beca.descripcion && <p className="lead">{beca.descripcion}</p>}

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Institución que otorga</h5>
              {!inst ? (
                <p className="mb-0 text-muted">No registrada</p>
              ) : (
                <ul className="mb-0">
                  <li>
                    <Link to={`/instituciones/${inst.id}`}>
                      {inst.nombre || inst.id}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Información</h5>
              {beca.modalidad && <p className="mb-1"><strong>Modalidad:</strong> {beca.modalidad}</p>}
              {beca.duracion && <p className="mb-1"><strong>Duración:</strong> {beca.duracion}</p>}
              {!!beca.areas.length && (
                <p className="mb-1"><strong>Áreas:</strong> {beca.areas.join(", ")}</p>
              )}
              {raw?.link && (
                <a className="btn btn-outline-primary mt-2" href={raw.link} target="_blank" rel="noreferrer">
                  Ver bases / postulación
                </a>
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
