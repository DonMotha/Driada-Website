

import { useParams } from "react-router-dom";

function DetalleInstituto() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h2>Detalle de institución #{id}</h2>
      <p>Aquí mostraremos la información desde MongoDB...</p>
    </div>
  );
}

export default DetalleInstituto;