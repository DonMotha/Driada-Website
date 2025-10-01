import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BecasSearchBar from "./Components/Becas-SearchBar";
import BecasHeader from "./Components/Becas-Header";
import BecasGrid from "./components/Becas-Grid";
import { BECAS } from "./components/BecasCarreras"; // Asegúrate de tener los datos de Becas y Carreras importados
import "../../../../Home/stylehome.css";
import "../../../../Instituciones/insti.css";

export default function BecasCarreras() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [filter, setFilter] = useState("todos"); // Nuevo estado para filtrar por "todos", "becas" o "carreras"

  // Filtrar los datos según el filtro y la búsqueda
  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    const filteredData = filter === "todos" 
      ? BECAS 
      : BECAS.filter(item => item.tipo.toLowerCase() === filter); // Filtrar según el tipo de "becas" o "carreras"

    if (!term) return filteredData;
    return filteredData.filter(d =>
      `${d.nombre} ${d.tipo} ${d.ciudad} ${d.desc}`.toLowerCase().includes(term)
    );
  }, [q, filter]);

  const handleChange = (val) => {
    setQ(val);
    const n = new URLSearchParams(params);
    if (val) n.set("q", val); else n.delete("q");
    setParams(n, { replace: true });
  };

  // Cambiar entre Becas, Carreras o Todos
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <section className="becas py-5 bg-white">
      <div className="container">
        <BecasHeader
          title="Becas y Carreras"
          subtitle="Descubre las mejores oportunidades educativas con estas becas y carreras"
        />

        {/* Filtro de Becas / Carreras y barra de búsqueda juntos */}
        <div className="d-flex justify-content-start align-items-center mb-4">
          {/* Dropdown para Becas o Carreras */}
          <select className="form-select w-auto" value={filter} onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="beca">Becas</option>
            <option value="carrera">Carreras</option>
          </select>

          {/* Barra de búsqueda */}
          <div className="ms-3" style={{ flexGrow: 1 }}> {/* Espacio entre filtro y barra */}
            <BecasSearchBar value={q} onChange={handleChange} />
          </div>
        </div>

        {/* Mostrar los resultados */}
        <BecasGrid items={list} emptyText={`No encontramos resultados para “${q}” en ${filter}.`} />
      </div>
    </section>
  );
}
