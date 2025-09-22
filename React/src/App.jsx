
import { Routes, Route } from "react-router-dom";
import Home from '../../Home/Home'
import DetalleInstituto from '../../Home/Components/DetalleInstituto'
import '../../Home/stylehome.css'

function App() {
  

  return (
    <Routes>
    <Route path="/"element={<Home/>} />
    <Route path="/datalle/:id" element={<DetalleInstituto/>} />
     
    </Routes>
  )
}

export default App
