// src/api/becas.js
import { api } from "./client";

/**
 * Lista (preview) de becas.
 * Acepta query params opcionales (ej: { activa:true, institutionId, area }).
 * Devuelve siempre un array.
 */
export async function fetchBecas(params = {}) {
  const res = await api.get("/becas", { params });
  const payload = res.data;
  // Soporta tanto array directo como { data: [...] }
  return Array.isArray(payload) ? payload : payload?.data ?? [];
}

/**
 * Detalle de beca por ID.
 * Devuelve el objeto de la beca (o null si no hay).
 */
export async function fetchBecaById(id) {
  if (!id) throw new Error("ID requerido");
  const res = await api.get(`/becas/${encodeURIComponent(id)}`);
  const payload = res.data;
  // Soporta tanto objeto directo como { data: {...} }
  return payload?.data ?? payload ?? null;
}
