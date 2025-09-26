
import { Routes, Route } from "react-router-dom";
import Home from '../../Home/Home'
import DetalleInstituto from '../../Home/Components/DetalleInstituto'
import '../../Home/stylehome.css'
import "./Components/Navbar";
import "./Components/Footer";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Insti from "../../Instituciones/insti";
import User from "../../PerfilUsuario/User";
import '../src/App.css';
import BecasCarreras from "../../Carreras-Becas/Becas-C";
import Carreras from "../../Carreras/Carreras";


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/"element={<Home/>} />
    <Route path="/detalle/:id" element={<DetalleInstituto/>} />
    <Route path="/instituciones" element={<Insti/>}/>
    
    <Route path="/perfil" element = {<User/>}/>
    <Route path="/becasycarreras" element={<BecasCarreras/>}/>
    <Route path="/carreras" element={<Carreras/>}/>
    </Routes>

    <Footer/>
  
    </>
  );
}

export default App


