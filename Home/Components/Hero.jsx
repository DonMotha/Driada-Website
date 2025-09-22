import { useState } from "react";


function Hero() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        alert(`Buscando: ${query}`);  // aquí luego rediriges o filtras
    };
    return (
        <section className="hero text-center py-5 bg-light-blue">
            <div className="container">
                <h1 className="fw-bold display-5">Encuentra la <span className="text-primary">beca perfecta</span><br />para tu futuro
                </h1>
                <p className="lead mt-3 mb-4 text-muted">Conectamos estudiantes talentososo con oportunidades educativas
                    excepcionales. Tu
                    sueño academico esta a un clic de distancia.</p>

                <div className="d-flex flex-column align-items-center w-50 mx-auto">
                    <input type="text" id="searchInput" value={query}
                        onChange={(e) => setQuery(e.target.value)} className="form-control mb-2 w-100"
                        placeholder="Buscar carreras, instituciones..." />
                    <p className="text-center">¿Ya sabes qué estudiar? Busca becas y beneficios</p>
                    <button id="searchButton" onClick={handleSearch} className="btn btn-primary w-25">Buscar aqui</button>
                </div>
            </div>
        </section>
    );
}
export default Hero;