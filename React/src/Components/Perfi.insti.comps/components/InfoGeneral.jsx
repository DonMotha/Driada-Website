


function InfoGeneral({ institucion }) {
    return (
// ⭐
        // <div className="card-body">
        //     <h3 className="card-title">{institucion.nombre}</h3>
        //         <span>{institucion.puntuacion}<span className="star info">&#9733;</span></span>
        //     <div className="row mb-3"></div>
        //     <span className="badge rounded-pill text-bg-primary">{institucion.tipo}</span>
        //     <p className="card-text" style={{marginTop: "7%"}}>{institucion.descripcion}</p>
        //     <p className="card-text">
        //         {/* <small className="text-body-secondary">Last updated 3 mins ago</small> */}
        //     </p>
        //     {/* <h5 className="card-title">Cursos</h5> */}
        //   {/*   <span className="badge rounded-pill text-bg-secondary shadow hover-shadow">Bootcamps de 14
        //         semanas</span> */}
        // </div>
<div className="card-body p-0">
    <h3 className="card-title h4">{institucion.nombre}</h3>
    
    {/* Rating actual */}
    <div className="d-flex align-items-center mb-2">
        <span className="fw-bold me-2">{institucion.puntuacion}</span>
        <span className="star info">&#9733;</span>
    </div>
    
    {/* Badge tipo */}
    <span className="badge rounded-pill text-bg-primary mb-3">{institucion.tipo}</span>
    
    {/* Descripción */}
    <p className="card-text mt-3">{institucion.descripcion}</p>
</div>
    )
}

export default InfoGeneral