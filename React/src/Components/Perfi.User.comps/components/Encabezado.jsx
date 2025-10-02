import LogoUsuario from '../../../../public/LogoUsuario.svg'

function Encabezado() {
    return(
        <div className="text-center">
        {/* <!-- Encabezado --> */}
        <img
          className="foto-usuario"
          src={LogoUsuario}
          alt="Imagen vacía de usuario invitado"
        />
        <h1 className="title">Usuario invitado</h1>
        <p className="subtitle">Explora sin límites</p>
      </div>
    )
}

export default Encabezado