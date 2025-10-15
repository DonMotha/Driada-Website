import { api } from "./client";

export async function getMe() {
    const { data } = await api.get("/me");
    return data.user || data;
}
export async function updateMe(payload) {
    const { data } = await api.put("/me", payload);
    return data.user || data;
}
export async function uploadAvatar(file) {
    const form = new FormData();
    form.append("avatar", file);
    const { data } = await api.post("/upload/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data.avatarUrl;
}