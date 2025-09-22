function Secciones() {
    return(
        <div className="sections">
        <div className="row">
          {/* <!-- Elementos guardados --> */}
          <img src="images/bookmark.svg" className="col-1" />
          <h5 className="col-11">Elementos Guardados</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Historial de búsqueda --> */}
          <img src="images/Clock.svg" className="col-1" />
          <h5 className="col-11">Historial de Búsqueda</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Becas y beneficios --> */}
          <img src="images/Certificate.svg" className="col-1" />
          <h5 className="col-11">Becas y Beneficios</h5>
        </div>
        <hr />
        <div className="row">
          {/* <!-- Configuración --> */}
          <img src="images/Setting.svg" className="col-1" />
          <h5 className="col-11">Configuración</h5>
        </div>
      </div>
    )
}

export default Secciones