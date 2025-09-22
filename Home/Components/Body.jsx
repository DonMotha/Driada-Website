

import Footer from "../../React/src/Components/Footer"
import Navbar from "../../React/src/Components/Navbar"
import Apoyo from "./Apoyo"
import Hero from "./Hero"
import Instituciones from "./Instituciones"


function Body() {
    return(
        <body class="bg-light">
            <Navbar/>
            <Hero/>
            <Instituciones/>
            <Apoyo/>
            <Footer/>
            

        </body>
    )
}

export default Body