// src/api/catalogoPreview.js
// Unifica PREVIEW de Becas + Carreras desde el cliente (sin tocar backend).
// Devuelve SOLO: { id, kind, nombre, tipo, descripcion }

import { api } from "./client";

/**
 * Pide /becas y /carreras (en paralelo), normaliza y fusiona.
 * @param {'todos'|'beca'|'carrera'} tipo  Filtro para evitar llamadas innecesarias.
 * @param {string} q  Filtro de texto (opcional, se aplica en el cliente).
 * @returns {Promise<Array<{id:string, kind:'beca'|'carrera', nombre:string, tipo:string, descripcion:string}>>}
 */
export async function fetchCatalogoPreviewClient({ tipo = "todos", q = "" } = {}) {
  // Ejecuta llamadas solo si corresponden al filtro
  const [B, C] = await Promise.all([
    tipo === "beca" || tipo === "todos" ? api.get("/becas") : Promise.resolve({ data: [] }),
    tipo === "carrera" || tipo === "todos" ? api.get("/carreras") : Promise.resolve({ data: [] }),
  ]);

  // Acepta tanto array directo como { data: [...] }
  const becas = Array.isArray(B.data) ? B.data : B.data?.data ?? [];
  const carreras = Array.isArray(C.data) ? C.data : C.data?.data ?? [];
  

  // Normaliza BECAS -> { id, kind, nombre, tipo, descripcion }
    //kind es un tack , como una etiqueta 
  const bnorm = (becas || []).map((b) => ({
    id: String(b._id ?? b.id ?? ""),
    kind: "beca",
    nombre: b.nombre ?? b.Nombre ?? "",
    // Si backend no trae 'tipo', usamos "Beca" para la etiqueta
    tipo: b.tipo ?? b.Tipo ?? "Beca",
    descripcion: b.descripcion ?? b.Descripcion ?? "",
  }));

  // Normaliza CARRERAS -> { id, kind, nombre, tipo, descripcion }
  //kind es un tack , como una etiqueta 
  const cnorm = (carreras || []).map((c) => ({
    id: String(c._id ?? c.id ?? ""),
    kind: "carrera",
    nombre: c.nombre ?? c.Nombre ?? "" ?? c.NOMBRE,
    // Si backend no trae 'tipo', usamos "Carrera"
    tipo: c.tipo ?? c.Tipo ?? "Carrera" ?? c.Tipo,
    descripcion: c.descripcion ?? c.Descripcion ?? "",
  }));

  // Merge y filtro de texto (en cliente)
  let data = [...bnorm, ...cnorm];

  if (q) {
    const term = q.toLowerCase().trim();
    data = data.filter((d) =>
      `${d.nombre} ${d.tipo} ${d.descripcion}`.toLowerCase().includes(term)
    );
  }

  return data;
}
