import { useState, useEffect } from 'react'
import '../../../src/Components/Perfi.becas.comps/Beca.css'


function Beca() {
    const [beca, setBeca] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:4000/api/becas/68b75717aa6af0866f95d2ca')
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
    }, [])

    if (loading) return <div className='container my-5 text-center'><p>Cargando beca...</p></div>

    if (error) return <div className='container my-5 text-center'><p>Error: {error}</p></div>

    if (!beca) return <div className='container my-5 text-center'><p>No se encontraron datos de la beca</p></div>

    function normalizeUrl(u) {
        if (!u) return null;
        try {
            const url = new URL(u);
            if (url.protocol === "http:") url.protocol = "https:";
            return url.toString();
        } catch {
            return null;
        }
    }


    return (
        <>
            <div className="beca-container">
                <div className="row">
                    <div className="beca-image col-sm-3">
                        <img
                            src={normalizeUrl(beca.img) || "#"}
                            className="img-fluid"
                            style={{ borderRadius: "8px" }}
                            alt="Beca"
                        />
                    </div>

                    <div className=" col-sm-8">
                        <div className="beca-subtitle">{beca.institucionId || "Institución no disponible"}</div>
                        <h1 className="beca-title">{beca.nombre || "Nombre no disponible"}</h1>

                        <div className="beca-tags">
                            <div className="beca-tag"> {beca.areas || "Área no especificada"} </div>
                            <div className="beca-tag"> RSH: {beca.requisitos?.RSH}% </div>
                            <div className="beca-tag"> PAES: {beca.requisitos?.puntaje} </div>
                        </div>
                    </div>
                </div>

                <div className="beca-section-title">Acerca de esta beca</div>
                <p className="beca-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum placeat dicta laborum autem neque amet beatae? Commodi similique ullam neque, ab quos sapiente quo, repudiandae aspernatur autem amet dolore.
                </p>
                <p className="beca-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illum nobis error laboriosam quis? Nulla, itaque vitae consequuntur libero distinctio ratione tenetur, dolores laborum eveniet recusandae corrupti aperiam dolorem accusantium.
                </p>

                <a href="#" className='beca-button'>Ver convocatoria</a>

            </div>
        </>
    )
}

export default Beca