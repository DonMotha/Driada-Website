import { useEffect, useState } from "react"
import Encabezado from "./components/Encabezado"
import Numeros from "./components/Numeros"
import Secciones from "./components/Secciones"
import { getMe, updateMe, uploadAvatar } from "../../api/profile"
import "../../../src/Components/Perfi.User.comps/user-style.css"

function User() {
    const [ me, setMe ] = useState(null);
    const [ saving, setSaving ] = useState(false);
    const [ msg, setMsg ] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const u = await getMe();
                setMe(u);
            } catch { /* si 401 , podria redirigir a /login*/}
        })();
    }, []);

    const onSave = async (partial) => {
    setSaving(true);
    setMsg("");
    try {
        const updated = await updateMe(partial);
        const u = updated.user || updated;
        setMe(u);
      sessionStorage.setItem("me", JSON.stringify(u)); // refresca navbar
        setMsg("Perfil actualizado");
    } catch {
        setMsg("No se pudo actualizar perfil");
    } finally {
        setSaving(false);
    } };

    const onAvatarSelect = async (file) => {
    if (!file) return;
    try {
      // Si usas upload de archivo:
        const url = await uploadAvatar(file);
        await onSave({ avatarUrl: url });
    } catch {
        setMsg("No se pudo subir avatar");
    }};

    if (!me) return <div className="container my-5">Cargando…</div>;
    return(
        <body>
            <div className="container my-5">
                <Encabezado me={me} onSave={onSave} onAvatarSelect={ onAvatarSelect} saving={saving} msg={msg} />
                <hr />
                <Numeros me={me} />
                <hr />
                <Secciones me={me}/>
                <hr />
            </div>
        </body>
    );
}

export default User