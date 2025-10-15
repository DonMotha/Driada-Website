import { api } from "./client";

export async function fetchInstitucionesPrevias() {
    const {data} = await api.get("/institucionesPrevias");
    return data.data || [];
}

export async function fetchInstitucionById(id) {
    const { data } = await api.get(`/instituciones/${id}`);
    return data?.data;
}