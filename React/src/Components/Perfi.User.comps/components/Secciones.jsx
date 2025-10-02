import bookmark from '../../../../public/bookmark.svg'
import Clock from '../../../../public/Clock.svg'
import Certificate from '../../../../public/Certificate.svg'
import Setting from '../../../../public/Setting.svg'

function Secciones() {
    return(
        <div className="user-sections">
        <div className="section-row">
          {/* <!-- Elementos guardados --> */}
          <img src={bookmark} alt='Guardados' />
          <h5 className="col-11">Elementos Guardados</h5>
        </div>
        <hr />
        <div className="section-row">
          {/* <!-- Historial de búsqueda --> */}
          <img src={Clock} alt='Historial de búsqueda' />
          <h5 className="col-11">Historial de Búsqueda</h5>
        </div>
        <hr />
        <div className="section-row">
          {/* <!-- Becas y beneficios --> */}
          <img src={Certificate} alt='Becas y beneficios' />
          <h5 className="col-11">Becas y Beneficios</h5>
        </div>
        <hr />
        <div className="section-row">
          {/* <!-- Configuración --> */}
          <img src={Setting} alt='Configuración' />
          <h5 className="col-11">Configuración</h5>
        </div>
      </div>
    )
}

export default Secciones