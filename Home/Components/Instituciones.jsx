


import Card from "./Cards";


function Instituciones() {
    return (
        <section class="institutions py-5 bg-white">
            <div class="container">
                <h2 class="text-center fw-bold">Instituciones y fundaciones destacadas</h2>
                <p class="text-center text-muted mb-5">Descubre las mejores oportunidades educativas en instituciones
                    reconocidas por su excelencia académica</p>

                
                <div id="institutionsCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                        <div class="carousel-item active">
                            <div class="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                        <div class="carousel-item active">
                            <div class="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#institutionsCarousel"
                                data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#institutionsCarousel"
                                data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                    </button>
                </div>
            </div>
        </section>
    );
}  
export default Instituciones;