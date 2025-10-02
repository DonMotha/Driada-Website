import BtnMasCursos from "./components/BtnMasCursos";
import ConvAbiertas from "./components/ConvAbiertas";
import Cursos from "../Perfi.insti.comps/components/Cursos";
import Features from "./components/Features";
import InfoGeneral from "./components/InfoGeneral";
import Header from "./components/Header"
import '../../../../Kaly-Driada/style-institPerfil.css';
import LogGene from '../../../public/LogGene.svg'


function Hero() {
    return (
        <>
        <Header/>
        <div class="container kaly">
            <div class="card mb-4 w-100">
                <div class="row w-auto p-3">
                    <div class="image-placeholder col-md-3">
                        <img src={LogGene} class="img-fluid rounded-start" alt="" />
                    </div>
                    <div class="col-md-6">
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