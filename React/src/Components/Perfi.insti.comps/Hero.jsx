import BtnMasCursos from "./components/BtnMasCursos";
import ConvAbiertas from "./components/ConvAbiertas";
import Cursos from "../Perfi.insti.comps/components/Cursos";
import Features from "./components/Features";
import InfoGeneral from "./components/InfoGeneral";
import Header from "./components/Header"
import '../../../src/Components/Perfi.insti.comps/style-institPerfil.css';
import LogGene from '../../../public/LogGene.svg'


function Hero() {
    return (
        <>
        <Header/>
        <div className="container perfilinsti-kaly">
            <div className="card mb-4 w-100">
                <div className="row w-auto p-3">
                    <div className="col-md-3">
                        <img src={LogGene} className="img-fluid rounded-start" alt="Logo Institucional" />
                    </div>
                    <div className="col-md-6">
                        <InfoGeneral />
                        </div>
                        
                        <Features />
                        <Cursos />
                        <BtnMasCursos />
                        <ConvAbiertas />
                    </div>
                </div>
        </div>
</>
    )
}

export default Hero