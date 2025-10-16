
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home.comps/Home'
import Footer from "./Components/Foot.comps/Footer";
import Navbar from "./Components/Nav.comps/Navbar";
import Insti from "../src/Components/Insti.comps/insti";
import User from "./Components/Perfi.User.comps/User";
import BecasCarreras from "../src/Components/Becas.comps/Becas-C";
import Beca from "./Components/Perfi.becas.comps/Beca";
import PerfilInsti from "./Components/Perfi.insti.comps/PerfilInsti";
import Carreras from "./Components/Carreras.comps/Carreras";
import '../src/App.css';
import '../src/Components/Home.comps/stylehome.css'
import "./Components/Nav.comps/Navbar";
import "./Components/Foot.comps/Footer";
import Login from "./Components/Login.comps/Login";
import Register from "./Components/Login.comps/Register";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<PerfilInsti />} /> {/*DetalleInstituto*/}
        <Route path="/instituciones" element={<Insti />} />
        <Route path="/perfil" element={<User />} />
        <Route path="/becas" element={<BecasCarreras />} />
        <Route path="/becas/:id" element={<Beca />} />
        <Route path="/perfil-insti" element={<PerfilInsti />} />
        <Route path="/carreras/:id" element={<Carreras />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Register/>} />


      </Routes>
      <Footer />
    </>
  );
}

export default App


