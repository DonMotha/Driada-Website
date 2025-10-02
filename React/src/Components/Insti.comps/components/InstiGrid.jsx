import InstitutionCard from "./InstiCard";

export default function InstitutionsGrid({ items, emptyText }) {
  if (!items?.length) {
    return <div className="alert alert-light border text-center">{emptyText || "Sin resultados"}</div>;
  }
  return (
    <div className="row gx-4 gy-4">
      {items.map((it) => (
        <div key={it.id} className="col-12 col-md-6 col-lg-4">
          <InstitutionCard item={it} />
        </div>
      ))}
    </div>
  );
}
