


function InfoGeneral({ institucion }) {
    return (

        <div className="card-body">
            <h3 className="card-title">{institucion.nombre}</h3>
                <span>{institucion.puntuacion}⭐</span>
            <div className="row mb-3"></div>
            <span className="badge rounded-pill text-bg-primary">{institucion.tipo}</span>
            <p className="card-text" style={{marginTop: "7%"}}>{institucion.descripcion}</p>
            <p className="card-text">
                {/* <small className="text-body-secondary">Last updated 3 mins ago</small> */}
            </p>
            {/* <h5 className="card-title">Cursos</h5> */}
          {/*   <span className="badge rounded-pill text-bg-secondary shadow hover-shadow">Bootcamps de 14
                semanas</span> */}
        </div>

    )
}

export default InfoGeneral