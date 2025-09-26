export default function BecasRating({ value }) {
  const v = Number(value || 0).toFixed(1);  // Corregido
  return (
    <span className="badge rounded-pill bg-light text-dark shadow-sm px-2 py-1 d-inline-flex align-items-center gap-1">
      <i className="fa-solid fa-star text-warning" />
      <span className="fw-semibold">{v}</span>
    </span>
  );
}
