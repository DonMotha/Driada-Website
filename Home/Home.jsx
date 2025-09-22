import Footer from "../React/src/Components/Footer"
import Navbar from "../React/src/Components/Navbar"
import Cta from "./Components/Cta"
import Hero from "./Components/Hero"
import Instituciones from "./Components/Instituciones"


function Home() {
    return(
        <>
        <Navbar/>
        <Hero/>
        <Instituciones/>
        <Cta/>
        <Footer/>
        </> 

    )
}

export default Home