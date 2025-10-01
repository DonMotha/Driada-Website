import BecasCard from "./Becas-Card"

export default function BecasGrid({ items, emptyText }) {
  if (!items?.length) {
    return <div className="alert alert-light border text-center">{emptyText || "Sin resultados"}</div>;
  }
  return (
    <div className="row gx-4 gy-4">
      {items.map((it) => (
        <div key={it.id} className="col-12 col-md-6 col-lg-4">
          <BecasCard item={it} />
        </div>
      ))}
    </div>
  );
}
