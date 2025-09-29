

import { useParams } from "react-router-dom";
import { INSTITUCIONES } from "../../Instituciones/Components/instituciones";

function DetalleInstituto() {
  const { id } = useParams();
  const inst = INSTITUCIONES.find((i) => i.id === id);

  if (!inst) return <p>No se encontro la isntitucion</p>

  return (
    <div className="container py-5">
      <h2>{inst.nombre}</h2>
      <p><strong>Tipo:</strong> {inst.tipo}</p>
      <p><strong>Ciudad:</strong> {inst.ciudad}</p>
      <p><strong>Descripción:</strong> {inst.desc}</p>
      <img src={inst.img} alt={inst.nombre} width="200" />
    </div>
  );
}

export default DetalleInstituto;