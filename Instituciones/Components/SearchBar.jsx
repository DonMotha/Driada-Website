export default function SearchBar({ value, onChange }) {
  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="input-group" style={{ maxWidth: 560 }}>
        <span className="input-group-text bg-white">
          <i className="fa-solid fa-magnifying-glass" />
        </span>
        <input
          value={value}
          onChange={(e)=>onChange?.(e.target.value)}
          type="search"
          className="form-control"
          placeholder="Buscar instituciones, ciudades..."
          autoComplete="off"
        />
        <button className="btn btn-primary" type="button">Buscar</button>
      </div>
    </div>
  );
}
