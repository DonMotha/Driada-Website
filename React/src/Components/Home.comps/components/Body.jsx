// Home.comps/components/Body.jsx
import Instituciones from "./Instituciones";

export default function Body() {
  return (
    <>
      <section className="hero py-5 bg-light">
        <div className="container text-center">
          <h1 className="fw-bold">
            Encuentra la <span className="text-primary">beca perfecta</span> para tu futuro
          </h1>
          <p className="text-muted">
            Conectamos estudiantes talentosos con oportunidades educativas excepcionales.
          </p>
          <input
            type="text"
            className="form-control w-50 mx-auto"
            placeholder="Buscar carreras, instituciones..."
          />
          <button className="btn btn-primary mt-3">Buscar aquí</button>
        </div>
      </section>

      {/* Sección dinámica */}
      <Instituciones />
    </>
  );
}
