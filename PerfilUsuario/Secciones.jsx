import bookmark from './images/bookmark'
import Clock from './images/Clock'
import Certificate from './images/Certificate'
import Setting from './images/Setting'

function Secciones() {
    return(
        <div className="sections">
        <div className="row">
          {/* <!-- Elementos guardados --> */}
          <img src={bookmark} className="col-1" />
          <h5 className="col-11">Elementos Guardados</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Historial de búsqueda --> */}
          <img src={Clock} className="col-1" />
          <h5 className="col-11">Historial de Búsqueda</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Becas y beneficios --> */}
          <img src={Certificate} className="col-1" />
          <h5 className="col-11">Becas y Beneficios</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Configuración --> */}
          <img src={Setting} className="col-1" />
          <h5 className="col-11">Configuración</h5>
        </div>
      </div>
    )
}

export default Secciones