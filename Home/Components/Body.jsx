

import Footer from "../../React/src/Components/Footer"
import Navbar from "../../React/src/Components/Navbar"
import Apoyo from "./Apoyo"
import Hero from "./Hero"
import Instituciones from "./Instituciones"


function Body() {
    return(
        <div className="bg-light">
            <Hero/>
            <Instituciones/>
            <Apoyo/>
        </div>
    )
}

export default Body