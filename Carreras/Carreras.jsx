import './App.css';
function Carreras() {
   

    return (
          <div className="container">

    <div className="image-placeholder">
      <img src="images/Cosmetologia.png" alt="Cosmetología" className="img-fluid" style ={{borderRadius:"8px;"}}/>
    </div>

    <div className="subtitle">Carrera Técnica</div>
    <h1>Cosmetología</h1>

    <div className="tags">
      <div className="tag">Técnico</div>
      <div className="tag">Belleza</div>
    </div>

    <div className="rating">
      ✩ <span>4.9</span> (98% votos)
    </div>

    <div className="section-title">Qué te puede atraer de esta Carrera</div>
    <p>
       Al estudiar cosmetología, obtendrás el conocimiento teórico y práctico para llevar a cabo procedimientos destinados a la mantención, revitalización y rejuvenecimiento de la piel, así como otros procedimientos relacionados con la estética integral.
    </p>

    <a href="#" className="button">Ver Malla</a>
  </div>
     )
   }

export default Carreras