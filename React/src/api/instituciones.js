import { api } from "./client";

export async function fetchInstitucionesPrevias() {
    const {data} = await api.get("/institucionesPrevias");
    return data.data || [];
}