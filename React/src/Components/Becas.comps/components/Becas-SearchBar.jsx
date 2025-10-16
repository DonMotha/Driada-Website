// Barra de búsqueda CONTROLADA
// - value: string actual
// - onChange: (nuevoValor) => void
export default function BecasSearchBar({
  value,
  onChange,
  placeholder = "Buscar por nombre, tipo o descripción…",
}) {
  return (
    <input
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Buscar becas o carreras"
    />
  );
}
