
import Encabezado from "./components/Encabezado"
import Numeros from "./components/Numeros"
import Secciones from "./components/Secciones"
import "../../../../PerfilUsuario/user-style.css"
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