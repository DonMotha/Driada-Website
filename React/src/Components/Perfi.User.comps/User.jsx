
import Encabezado from "./components/Encabezado"
import Numeros from "./components/Numeros"
import Secciones from "./components/Secciones"
import "../../../src/Components/Perfi.User.comps/user-style.css"
function User() {
    return(
        <body>
            <div className="container my-5">
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