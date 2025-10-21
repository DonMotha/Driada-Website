import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* import BtnMasCursos from "./components/BtnMasCursos";
import ConvAbiertas from "./components/ConvAbiertas";
import Cursos from "./components/Cursos"; */
import Features from "./components/Features";
import InfoGeneral from "./components/InfoGeneral";
import Header from "./components/Header"
import Rating from "./components/Rating";
import '../../../src/Components/Perfi.insti.comps/style-institPerfil.css';
import { fetchInstituciones } from "../../api/instituciones";

function PerfilInsti() {

    const { id } = useParams(); // Obtiene el ID de la URL
    const [institucion, setInstitucion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {

        const cargarInstitucion = async () => {
            try {
                setLoading(true);
                const data = await fetchInstituciones(id);
                setInstitucion(data);
            } catch (err) {
                console.error("Error cargando institución:", err);
                setError("No se pudo cargar la información de la institución");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarInstitucion();
        }
        
    }, [id, refresh]);

    // Función para recargar los datos después de una votación
    const handleRatingUpdate = () => {
        setRefresh(prev => prev + 1); // Forzar recarga de datos
    };

    if (loading) return <div className="container text-center my-5"><p>Cargando institución...</p></div>
    if (error) return <div className="container text-center my-5"><p>Error: {error}</p></div>
    if (!institucion) return <div className="container text-center my-5"><p>No se encontró la institución</p></div>


    return (
        // <>
        // <Header />
        // <div className="container perfilinsti-kaly">
        //     <div className="card mb-4 w-100">
        //         <div className="row w-auto p-3">
        //             <div className="col-md-3">
        //                 <img
        //                     src={institucion.img}
        //                     className="img-fluid rounded-start"
        //                     alt="Logo Institucional" />
        //             </div>
        //             <div className="col-md-6">
        //                 <InfoGeneral institucion={institucion} />
        //             </div>

        //             {/* Sección de Rating */}
        //             <div className="row w-auto p-3">
        //                 <div className="col-12">
        //                     <Rating
        //                         institucionId={id}
        //                         puntuacionActual={institucion.puntuacion}
        //                         onRatingUpdate={handleRatingUpdate}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="row w-auto p-3">
        //             <div className="col-5"></div>
        //             <div className="col-4"></div>
        //             <Features institucion={institucion} className="col-3" />
        //             {/* <Cursos institucion={institucion} /> */}
        //             {/* <BtnMasCursos institucion={institucion} /> */}
        //             {/* <ConvAbiertas institucion={institucion} /> */}
        //         </div>
        //     </div>
        // </div>
        // </>
        <>


            <div className="container perfilinsti-kaly">
                {/* badge */}
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h1 className="fw-bold m-0"></h1>
                        <span className="badge text-bg-primary">Institución</span>
                    </div>
                </div>
                {/* badge */}
                <div className="card mb-4 w-100">
                    {/* Primera fila: Logo + InfoGeneral + Features */}
                    <div className="row g-3 p-3">
                        {/* Logo */}
                        <div className="col-md-3">
                            <img
                                src={institucion.img}
                                className="img-fluid rounded-start w-100"
                                alt="Logo Institucional"
                            />
                        </div>

                        {/* Información General */}
                        <div className="col-md-6">
                            <InfoGeneral institucion={institucion} />
                        </div>

                        {/* Features (botones) */}
                        <div className="col-md-3">
                            <Features institucion={institucion} />
                        </div>
                    </div>

                    {/* Segunda fila: Rating (ocupa todo el ancho) */}
                    <div className="row">
                        <div className="col-12">
                            <Rating
                                institucionId={id}
                                puntuacionActual={institucion.puntuacion}
                                onRatingUpdate={handleRatingUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilInsti