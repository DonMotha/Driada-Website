import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import InstitutionsGrid from "./Components/InstiGrid";
import { INSTITUCIONES } from "./Components/instituciones";
import "../Home/stylehome.css";
import "./insti.css"; 

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
    <section className="institutions py-5 bg-white">
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