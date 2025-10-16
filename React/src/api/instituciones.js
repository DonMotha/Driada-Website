import { api } from "./client";

//Traer info previs de instituciones -- Home, buscador de instituciones
export async function fetchInstitucionesPrevias() {
    const {data} = await api.get("/institucionesPrevias");
    return data.data || [];
}

//Traer info de intituciones por id -- Perfil de instituciones
export async function fetchInstituciones(id) {
    const {data} = await api.get(`/instituciones/${encodeURIComponent(id)}`)
    return data.data || null;
    
}

//Enviar opinion  -- Perfil de instituciones
export async function fetchUpdatePuntuacion(id, valor) {
    const {data} = await api.post(`/instituciones/${encodeURIComponent(id)}/updateOpinion`, {
        valor: valor
    });
    return data.data || null;
}
