
import { Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import Home from '../../Home/Home';
import DetalleInstituto from '../../Home/Components/DetalleInstituto';
import '../../Home/stylehome.css';
=======
import Home from '../../Home/Home'
import '../../Home/stylehome.css'
>>>>>>> Stashed changes
import "./Components/Navbar";
import "./Components/Footer";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Insti from "../../Instituciones/insti";
import User from "../../PerfilUsuario/User";
import '../src/App.css';
import BecasCarreras from "../../Carreras-Becas/Becas-C";
<<<<<<< Updated upstream
=======
import Beca from "../../PerfilBeca/Beca";
import PerfilInsti from "../../Kaly-Driada/Componentes/Hero";
import Hero from "../../Kaly-Driada/Componentes/Hero";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/"element={<Home/>} />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    
    
    <Route path="/datalle/:id" element={<DetalleInstituto/>} />
    <Route path="/instituciones" element={<Insti/>}/>
    <Route path="/perfil" element = {<User/>}/>
    <Route path="becasycarreras" element={<BecasCarreras/>}/>
=======
=======
>>>>>>> Stashed changes
    <Route path="/detalle/:id" element={<Hero/>} />
    <Route path="/instituciones" element={<Insti/>}/>
    <Route path="/perfil" element = {<User/>}/>
    <Route path="/becasycarreras" element={<BecasCarreras/>}/>
    <Route path="/perfil-beca/:id" element={<Beca/>}/>
    <Route path="/perfil-insti" element={<PerfilInsti/>}/>

>>>>>>> Stashed changes
    </Routes>

    <Footer/>
  
    </>
  );
}

export default App


