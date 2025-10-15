import { useEffect, useMemo, useState } from "react";
import SectionHeader from "./components/Header";
import SearchBar from "./components/SearchBar";
import InstitutionsGrid from "./components/InstiGrid";
import { fetchInstitucionesPrevias } from "../../api/instituciones";
import "../../../src/Components/Insti.comps/insti.css"; 


export default function Insti() {
  //useState es el estado local
  //setQ : es una funcion para actualizar el estado
  // q: valor inicial ,texto del buscador
  const [q, setQ] = useState("");
  // items: resultados crudos traídos del backend (normalizados en useEffect)
  const [items, setItems] = useState([]);
  // loading/err: estados de carga y error para dar feedback al usuario
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true; // flag para evitar setState si el componente se desmonta
    setLoading(true);
    setErr(null);

    // 1) Llamamos al backend
    fetchInstitucionesPrevias()
      .then((rows) => {
        if (!alive) return;

        // 2) Normalizamos campos para que el UI no dependa de nombres exactos
        //    (por si el backend cambia 'nombre'->'Nombre', 'img'->'Img', etc.)
        const norm = (rows || []).map((d) => ({
          id: d.id ?? d._id ?? String(d._id || ""),
          nombre: d.nombre ?? d.Nombre ?? "",
          tipo: d.tipo ?? d.Tipo ?? "",
          puntuacion: Number(d.puntuacion ?? d.Puntuacion ?? 0),
          img: d.img ?? d.Img ?? null,
          desc: d.desc ?? d.descripcion ?? "",
        }));
        setItems(norm);
      })
      .catch((e) => {
        // 3) Cualquier error de red/backend cae aquí
        setErr(e?.message || "Error al cargar instituciones");
      })
      .finally(() => alive && setLoading(false)); // 4) Cortamos el loader

    // Limpieza: si el componente se desmonta antes de que resuelva la promesa
    return () => {
      alive = false;
    };
  }, []);
  /**
   * Filtrado en memoria:
   * - Se ejecuta cada vez que cambian `q` o `items`.
   * - Convierte ambos a lower-case para búsqueda insensible a mayúsculas.
   * - Si `q` está vacío, devuelve la lista completa.
   */
  //filtra items por q, 
  const list = useMemo(()=>{
    const term = q.toLowerCase().trim();
    if (!term) return items;
    return items.filter((d)=>
      `${d.nombre} ${d.tipo}`.toLowerCase().includes(term)
    );
  }, [q, items]);
  
  return (
    <section className="insti-page">
      <div className="container">
        {/* Encabezado de la sección: título y subtítulo */}
        <SectionHeader
          title="Instituciones y fundaciones destacadas"
          subtitle="Busca y descubre oportunidades educativas"
        />

        {/* Barra de búsqueda controlada: levanta el estado `q` hacia arriba */}
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar institución..."
        />

        {/* Estados de UI */}
        {loading && (
          <div className="alert alert-light border text-center">Cargando…</div>
        )}
        {err && <div className="alert alert-danger text-center">{err}</div>}

        {/* Grid de resultados */}
        {!loading && !err && (
          <InstitutionsGrid items={list} emptyText={`Sin resultados para “${q}”.`} />
        )}
      </div>
    </section>
  )
}