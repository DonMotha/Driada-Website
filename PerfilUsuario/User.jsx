import Navbar from "../React/src/Components/Navbar"
import Footer from "../React/src/Components/Footer"
import Encabezado from "./Encabezado"
import Numeros from "./Numeros"
import Secciones from "./Secciones"

function User() {
    return(
        <body>
            <div className="container-fluid">
                <Navbar/>
                <Encabezado/>
                <hr />
                <Numeros/>
                <hr />
                <Secciones/>
                <hr />
                <Footer/>
            </div>
        </body>
    )
}

export default User