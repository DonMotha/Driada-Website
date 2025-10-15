// src/pages/Becas-C.jsx
// Vista PREVIEW unificada (Becas + Carreras) con PAGINACIÓN en el cliente.
// Usa: BecasHeader, BecasSearchBar, BecasGrid (sin tocar esos componentes).

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./preview-catalog.css";
import BecasSearchBar from "./components/Becas-SearchBar";
import BecasHeader from "./Components/Becas-Header";
import BecasGrid from "./components/Becas-Grid";

import "../../../src/Components/Insti.comps/insti.css";

// 👇 Ajusta la ruta si tu API vive en otro lugar
import { fetchCatalogoPreviewClient } from "../../api/catalogoPrevio";

// Config por defecto de paginación
const DEFAULT_PAGE_SIZE = 12;

export default function BecasCarreras() {
  // Sincroniza filtros con el querystring (?q=, ?tipo=, ?page=, ?size=)
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState(params.get("q") || "");
  const [filter, setFilter] = useState(params.get("tipo") || "todos"); // todos | beca | carrera
  const [page, setPage] = useState(Number(params.get("page") || 1));
  const [pageSize, setPageSize] = useState(
    Number(params.get("size") || DEFAULT_PAGE_SIZE)
  );

  // Datos fusionados (becas + carreras) ya normalizados
  const [items, setItems] = useState([]);

  // Estados de carga / error
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Cargar datos cada vez que cambien filtro o búsqueda.
  // (Nota: cambiamos la página a 1 cuando se modifica q o filter)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    fetchCatalogoPreviewClient({ tipo: filter, q })
      .then((rows) => alive && setItems(rows))
      .catch((e) => setErr(e?.message || "Error al cargar la vista previa"))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [filter, q]);

  // Total y páginas calculadas
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Si la página actual queda fuera de rango tras un nuevo fetch/cambio de size,
  // la ajustamos automáticamente y también el querystring.
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
      const n = new URLSearchParams(params);
      n.set("page", String(totalPages));
      setParams(n, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Lista paginada que se pasa al grid (y alias desc <- descripcion por compat)
  const listForGrid = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end).map((it) => ({ ...it, desc: it.descripcion }));
  }, [items, page, pageSize]);

  // Handlers — actualizan estado y querystring
  const handleSearchChange = (val) => {
    setQ(val);
    setPage(1);
    const n = new URLSearchParams(params);
    val ? n.set("q", val) : n.delete("q");
    n.set("page", "1");
    setParams(n, { replace: true });
  };

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilter(val);
    setPage(1);
    const n = new URLSearchParams(params);
    val ? n.set("tipo", val) : n.delete("tipo");
    n.set("page", "1");
    setParams(n, { replace: true });
  };

  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value);
    setPageSize(size);
    setPage(1);
    const n = new URLSearchParams(params);
    n.set("size", String(size));
    n.set("page", "1");
    setParams(n, { replace: true });
  };

  const gotoPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    const n = new URLSearchParams(params);
    n.set("page", String(next));
    setParams(n, { replace: true });
  };

  // Helper para numeración compacta (1 … prev curr next … N)
  const pageNumbers = useMemo(() => {
    const curr = page;
    const N = totalPages;
    if (N <= 7) return Array.from({ length: N }, (_, i) => i + 1);
    const nums = new Set([1, 2, N - 1, N, curr - 1, curr, curr + 1]);
    return Array.from(nums)
      .filter((x) => x >= 1 && x <= N)
      .sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <section className="becas py-5 bg-white">
      <div className="container">
        <BecasHeader
          title="Becas y Carreras"
          subtitle="Encuentra todas las becas y carreras disponibles"
        />

        {/* Controles: Filtro + Búsqueda + Tamaño de página */}
        <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
          <select
            className="form-select w-auto"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="todos">Todos</option>
            <option value="beca">Becas</option>
            <option value="carrera">Carreras</option>
          </select>

          <div className="flex-grow-1" style={{ minWidth: 240 }}>
            <BecasSearchBar
              value={q}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre, tipo o descripción…"
            />
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Por página:</span>
            <select
              className="form-select w-auto"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Estados */}
        {loading && (
          <div className="alert alert-light border text-center">Cargando…</div>
        )}
        {err && <div className="alert alert-danger text-center">{err}</div>}

        {/* Grid */}
        {!loading && !err && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">
                {total
                  ? `Mostrando ${(page - 1) * pageSize + 1}–${Math.min(
                      page * pageSize,
                      total
                    )} de ${total}`
                  : "Sin resultados"}
              </small>

              {/* Paginación (arriba también) */}
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => gotoPage(page - 1)}
                onNext={() => gotoPage(page + 1)}
                onGoto={gotoPage}
                pageNumbers={pageNumbers}
              />
            </div>

            <BecasGrid
              items={listForGrid}
              emptyText={`No encontramos resultados para “${q}” en ${filter}.`}
              enableNavigate={false} // cambia a true si quieres ir a /becas/:id o /carreras/:id
            />

            {/* Paginación (abajo también) */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-end mt-3">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={() => gotoPage(page - 1)}
                  onNext={() => gotoPage(page + 1)}
                  onGoto={gotoPage}
                  pageNumbers={pageNumbers}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/** Componente pequeño de paginación */
function Pagination({ page, totalPages, onPrev, onNext, onGoto, pageNumbers }) {
  return (
    <nav>
      <ul className="pagination m-0">
        <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={onPrev}>
            «
          </button>
        </li>

        {/* números (compacto con elipsis) */}
        {pageNumbers.map((n, i, arr) => {
          const prev = arr[i - 1];
          const showDots = i > 0 && n - prev > 1;
          return (
            <span key={`pg-${n}`} className="d-flex">
              {showDots && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}
              <li className={`page-item ${page === n ? "active" : ""}`}>
                <button className="page-link" onClick={() => onGoto(n)}>
                  {n}
                </button>
              </li>
            </span>
          );
        })}

        <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={onNext}>
            »
          </button>
        </li>
      </ul>
    </nav>
  );
}
