
import { Routes, Route } from "react-router-dom";
import Home from '../../Home/Home';
import DetalleInstituto from '../../Home/Components/DetalleInstituto';
import '../../Home/stylehome.css';
import "./Components/Navbar";
import "./Components/Footer";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Insti from "../../Instituciones/insti";
import User from "../../PerfilUsuario/User";
import '../src/App.css';


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/"element={<Home/>} />
    
    
    <Route path="/datalle/:id" element={<DetalleInstituto/>} />
    <Route path="/instituciones" element={<Insti/>}/>
    <Route path="/perfil" element = {<User/>}/>
    </Routes>

    <Footer/>
  
    </>
  );
}

export default App


