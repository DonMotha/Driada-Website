import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* import BtnMasCursos from "./components/BtnMasCursos";
import ConvAbiertas from "./components/ConvAbiertas";
import Cursos from "./components/Cursos"; */
import Features from "./components/Features";
import InfoGeneral from "./components/InfoGeneral";
import Header from "./components/Header"
import '../../../src/Components/Perfi.insti.comps/style-institPerfil.css';
// import LogGene from '../../../src/assets/LogGene.svg'
import { fetchInstituciones } from "../../api/instituciones";

function PerfilInsti() {

    const { id } = useParams(); // Obtiene el ID de la URL
    const [institucion, setInstitucion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [id]);

    if (loading) return <div className="container text-center my-5"><p>Cargando institución...</p></div>
    if (error) return <div className="container text-center my-5"><p>Error: {error}</p></div>
    if (!institucion) return <div className="container text-center my-5"><p>No se encontró la institución</p></div>


    return (
        <>
            <Header />
            <div className="container perfilinsti-kaly">
                <div className="card mb-4 w-100">
                    <div className="row w-auto p-3">
                        <div className="col-md-3">
                            <img 
                            src={institucion.img} 
                            className="img-fluid rounded-start" 
                            alt="Logo Institucional" />
                        </div>
                        <div className="col-md-6">
                            <InfoGeneral institucion={institucion} />
                        </div>

                        <Features institucion={institucion} />
                        {/* <Cursos institucion={institucion} /> */}
                        {/* <BtnMasCursos institucion={institucion} /> */}
                        {/* <ConvAbiertas institucion={institucion} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilInsti