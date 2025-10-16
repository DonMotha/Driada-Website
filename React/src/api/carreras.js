// src/api/carreras.js
import { api } from "./client";

/**
 * Lista (preview) de carreras.
 * Devuelve siempre un array.
 */
export async function fetchCarreras(params = {}) {
  const res = await api.get("/carreras", { params });
  const payload = res.data;
  // Tu backend a veces responde { message, data: [...] }
  return Array.isArray(payload) ? payload : payload?.data ?? [];
}

/**
 * Detalle de carrera por ID.
 * Devuelve el objeto de la carrera (o null si no hay).
 */
export async function fetchCarreraById(id) {
  if (!id) throw new Error("ID requerido");
  const res = await api.get(`/carreras/${encodeURIComponent(id)}`);
  const payload = res.data;
  return payload?.data ?? payload ?? null;
}
