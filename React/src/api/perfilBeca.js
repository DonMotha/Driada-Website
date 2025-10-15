import { api } from "./client";

export async function fetchGetBecaById() {
    const {data} = await api.get("/api/becas/:id");
    return data.data || [] || data;
}
