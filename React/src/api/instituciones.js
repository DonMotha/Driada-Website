import { api } from "./client";
//Traer info previs de instituciones -- Home, buscador de instituciones
export async function fetchInstitucionesPrevias() {
    const {data} = await api.get("/institucionesPrevias");
    return data.data || [];
}
//Traer info de intituciones por id -- Perfil de instituciones
export async function fetchInstituciones(id) {
    const {data} = await api.get(`/instituciones/${encodeURIComponent(id)}`)
    return data.data || [];
    
}
//Enviar opinion  -- Perfil de instituciones
