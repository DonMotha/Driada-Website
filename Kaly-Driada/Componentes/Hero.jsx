import BtnMasCursos from "./BtnMasCursos";
import ConvAbiertas from "./ConvAbiertas";
import Cursos from "./Cursos";
import Features from "./Features";
import InfoGeneral from "./Infogeneral";
import Header from "./Header"
import '../style-institPerfil.css';


function Hero() {
    return (
        <>
        <Header/>
        <div class="container kaly">
            <div class="card mb-4 w-100">
                <div class="row w-auto p-3">
                    <div class="image-placeholder col-md-3">
                        <img src="\Images\Generation_Chile_logo_BLUE_v2.svg" class="img-fluid rounded-start" alt="" />
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