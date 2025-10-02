import { useParams } from "react-router-dom";
import { CARRERAS } from "./CarrerasA";
import '../../Components/Carreras.comps/Carreras.css';

function Carreras() {
  const { id } = useParams(); // obtiene el id desde la URL
  const carrera = CARRERAS.find((c) => c.id === id);

  if (!carrera) return <p className="text-center">Carrera no encontrada</p>;

  return (
    <div className="carreras-container">
      <div className="carreras-image-placeholder">
        <img
          src={carrera.img}
          alt={carrera.nombre}
          className="carreras-img-fluid"
          style={{ borderRadius: "8px" }}
        />
      </div>

      <div className="carreras-subtitle">{carrera.tipo}</div>
      <h1 className="carreras-title">{carrera.nombre}</h1>

      <div className="carreras-tags">
        {carrera.tags.map((t, idx) => (
          <div key={idx} className="carreras-tag">
            {t}
          </div>
        ))}
      </div>

      <div className="carreras-rating">
        ✩ <span>{carrera.rating}</span> ({carrera.votos}% votos)
      </div>

      <div className="carreras-section-title">Qué te puede atraer de esta Carrera</div>
      <p>{carrera.descripcion}</p>

      <a href="#" className="carreras-button">
        Ver Malla
      </a>
    </div>
  );
}

export default Carreras;