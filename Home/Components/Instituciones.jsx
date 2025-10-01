


import Card from "./Cards";
import { INSTITUCIONES } from "../../Instituciones/Components/instituciones";

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
function Instituciones() {
    const grupos = chunkArray(INSTITUCIONES, 3); // 👈 3 instituciones por slide

    return (
        <section className="institutions py-5 bg-white">
            <div className="container">
                <h2 className="text-center fw-bold">Instituciones y fundaciones destacadas</h2>
                <p className="text-center text-muted mb-5">Descubre las mejores oportunidades educativas en instituciones
                    reconocidas por su excelencia académica</p>


                <div
                    id="institutionsCarousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        {grupos.map((grupo, index) => (
                            <div
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                key={index}
                            >
                                <div className="row row-cols-2 row-cols-md-3 gx-4 gy-4">
                                    {grupo.map((inst) => (
                                        <Card key={inst.id} item={inst} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* controles */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#institutionsCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#institutionsCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                    </button>
                </div>
            </div>
        </section>
    );
}
export default Instituciones;