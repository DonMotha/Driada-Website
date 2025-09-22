



function Hero() {
    return (
        <section class="hero text-center py-5 bg-light-blue">
        <div class="container">
            <h1 class="fw-bold display-5">Encuentra la <spam class="text-primary">beca perfecta</spam><br/>para tu futuro
            </h1>
            <p class="lead mt-3 mb-4 text-muted">Conectamos estudiantes talentososo con oportunidades educativas
                excepcionales. Tu
                sueño academico esta a un clic de distancia.</p>

            <div class="d-flex flex-column align-items-center w-50 mx-auto">
                <input type="text" id="searchInput" class="form-control mb-2 w-100"
                    placeholder="Buscar carreras, instituciones..."/>
                <p class="text-center">¿Ya sabes qué estudiar? Busca becas y beneficios</p>
                <button id="searchButton" class="btn btn-primary w-25">Buscar aqui</button>
            </div>
        </div>
    </section>
    );
}
export default Hero;