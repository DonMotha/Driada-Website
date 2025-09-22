


import Card from "./Cards";


function Instituciones() {
    return (
        <section className="institutions py-5 bg-white">
            <div className="container">
                <h2 className="text-center fw-bold">Instituciones y fundaciones destacadas</h2>
                <p className="text-center text-muted mb-5">Descubre las mejores oportunidades educativas en instituciones
                    reconocidas por su excelencia académica</p>

                
                <div id="institutionsCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <div className="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <div className="row gx-4">
                                <Card/>
                                <Card/>
                                <Card/>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#institutionsCarousel"
                                data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#institutionsCarousel"
                                data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                    </button>
                </div>
            </div>
        </section>
    );
}  
export default Instituciones;