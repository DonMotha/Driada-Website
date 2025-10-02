import { useState,useEffect } from 'react'
import '../../../../PerfilBeca/Beca.css'


function Beca() {
    const [beca, setBeca] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch('/BecaDB.json')
            .then(Response => {
                if (!Response.ok) {
                    throw new Error('Error al cargar el archivo JSON')
                }
                    return Response.json()
                })
            .then(json => {
                setBeca(json)
                setError(null)
            })
            .catch((error) => {
                console.log("Error en fetch", error)
                setError(error.message)
                setBeca(null)
            })

            .finally(() => setLoading(false))
    },[])

    if (loading) return <div className='container my-5 text-center'><p>Cargando beca...</p></div>
    
    if (error) return <div className='container my-5 text-center'><p>Error: {error}</p></div>
    
    if (!beca) return <div className='container my-5 text-center'><p>No se encontraron datos de la beca</p></div>
    

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="image-placeholder col-sm-3">
                    <img
                        src="#"
                        className="img-fluid"
                        style={{ borderRadius: "8px" }}
                        alt="Beca"
                    />
                </div>

                <div className="container col-sm-8">
                    <div className="subtitle">{beca.institucionId || "Institución no disponible"}</div>
                    <h1 className="title">{beca.nombre || "Nombre no disponible"}</h1>

                    <div className="tags">
                        <div className="tag"> {beca.areas || "Área no especificada"} </div>
                        <div className="tag"> RSH: {beca.requisitos?.RSH}% </div>
                        <div className="tag"> PAES: {beca.requisitos?.puntaje} </div>
                    </div>
                </div>
            </div>

            <div className="section-title">Acerca de esta beca</div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum placeat dicta laborum autem neque amet beatae? Commodi similique ullam neque, ab quos sapiente quo, repudiandae aspernatur autem amet dolore.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illum nobis error laboriosam quis? Nulla, itaque vitae consequuntur libero distinctio ratione tenetur, dolores laborum eveniet recusandae corrupti aperiam dolorem accusantium.
            </p>

          
        </div>
        </>
    )
}

export default Beca