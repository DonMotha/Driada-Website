import { useParams } from "react-router-dom";
import { CARRERAS } from "../Carreras/CarrerasA";
import '../Carreras/Carreras.css';

function Carreras() {
  const { id } = useParams(); // obtiene el id desde la URL
  const carrera = CARRERAS.find((c) => c.id === id);

  if (!carrera) return <p className="text-center">Carrera no encontrada</p>;

  return (
    <div className="container">
      <div className="image-placeholder">
        <img
          src={carrera.img}
          alt={carrera.nombre}
          className="img-fluid"
          style={{ borderRadius: "8px" }}
        />
      </div>

      <div className="subtitle">{carrera.tipo}</div>
      <h1>{carrera.nombre}</h1>

      <div className="tags">
        {carrera.tags.map((t, idx) => (
          <div key={idx} className="tag">
            {t}
          </div>
        ))}
      </div>

      <div className="rating">
        ✩ <span>{carrera.rating}</span> ({carrera.votos}% votos)
      </div>

      <div className="section-title">Qué te puede atraer de esta Carrera</div>
      <p>{carrera.descripcion}</p>

      <a href="#" className="button">
        Ver Malla
      </a>
    </div>
  );
}

export default Carreras;