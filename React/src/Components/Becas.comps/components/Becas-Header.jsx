// ./Components/Becas-Header.jsx
export default function BecasHeader({
  title = "Becas y Carreras",
  subtitle = "Encuentra todas las becas y carreras disponibles",
}) {
  return (
    <header
      className="mb-4"
      // inline style => prioridad alta; además limita ancho y lo centra
      style={{ textAlign: "center", maxWidth: 960, margin: "0 auto" }}
    >
      <h2 className="fw-bold mb-1">{title}</h2>
      {subtitle && <p className="text-muted m-0">{subtitle}</p>}
    </header>
  );
}
