import LogoUsuario from '../../../../src/assets/LogoUsuario.svg'

function Encabezado({ me, onSave, onAvatarSelect, saving, msg }) {
  const name = me?.nombre || me?.name || "Usuario";
  const API = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api$/, "");
  const avatarSrc = me?.avatarUrl
    ? (me.avatarUrl.startsWith("http") ? me.avatarUrl : API + me.avatarUrl)
    : LogoUsuario;

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) onAvatarSelect(file);
  };

  const handleNameBlur = (e) => {
    const nuevo = e.target.value.trim();
    if (nuevo && nuevo !== name) onSave({ nombre: nuevo });
  };

  return (
    <div className="text-center">
      <img className="user-foto" src={avatarSrc} alt="Avatar del usuario" />
      <div className="mt-3 d-flex flex-column align-items-center gap-2">
        <input type="file" accept="image/*" className="form-control w-auto" onChange={handleAvatar} />
        <input
          className="form-control w-auto text-center"
          defaultValue={name}
          onBlur={handleNameBlur}
        />
        {msg && <small className="text-muted">{saving ? "Guardando…" : msg}</small>}
      </div>
      <p className="user-subtitle mt-2">{me.localidad || "Explora sin límites"}</p>
    </div>
  );
}

export default Encabezado;