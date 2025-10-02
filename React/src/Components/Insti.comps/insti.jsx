import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "./components/Header";
import SearchBar from "./components/SearchBar";
import InstitutionsGrid from "./components/InstiGrid";
import { INSTITUCIONES } from "./components/instituciones";

import "../../../src/Components/Insti.comps/insti.css"; 

export default function Insti() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return INSTITUCIONES;
    return INSTITUCIONES.filter(d =>
      `${d.nombre} ${d.tipo} ${d.ciudad} ${d.desc}`.toLowerCase().includes(term)
    );
  }, [q]);

  const handleChange = (val) => {
    setQ(val);
    const n = new URLSearchParams(params);
    if (val) n.set("q", val); else n.delete("q");
    setParams(n, { replace: true });
  };

  return (
    <section className="insti-page institutions py-5 bg-white">
      <div className="container">
        <SectionHeader
          title="Instituciones y fundaciones destacadas"
          subtitle="Descubre las mejores oportunidades educativas en instituciones reconocidas por su excelencia académica"
        />
        <SearchBar value={q} onChange={handleChange} />
        <InstitutionsGrid items={list} emptyText={`No encontramos resultados para “${q}”.`} />
      </div>
    </section>
  );
}