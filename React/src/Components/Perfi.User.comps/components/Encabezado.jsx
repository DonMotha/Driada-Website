import LogoUsuario from '../../../../src/assets/LogoUsuario.svg'

function Encabezado() {
    return(
        <div className="text-center">
        {/* <!-- Encabezado --> */}
        <img
          className="user-foto"
          src={LogoUsuario}
          alt="Imagen vacía de usuario invitado"
        />
        <h1 className="user-title">Usuario invitado</h1>
        <p className="user-subtitle">Explora sin límites</p>
      </div>
    )
}

export default Encabezado