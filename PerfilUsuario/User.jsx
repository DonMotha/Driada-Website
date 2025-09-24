import Navbar from "../React/src/Components/Navbar"
import Footer from "../React/src/Components/Footer"
import Encabezado from "./Encabezado"
import Numeros from "./Numeros"
import Secciones from "./Secciones"
import "./user-style.css"
function User() {
    return(
        <body>
            <div className="container-fluid">
                <Encabezado/>
                <hr />
                <Numeros/>
                <hr />
                <Secciones/>
                <hr />
            </div>
        </body>
    )
}

export default User