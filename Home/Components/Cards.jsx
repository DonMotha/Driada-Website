




function Card() {
    return (
        <div class="col-md-4">
            <div class="card institution-card h-100" data-url="detalle.html?id=1">
                <img src="imagenes/instituto1.jpg" class="card-img-top" alt="Instituto" />
                <span class="rating-badge">⭐ 4.2</span>
                <div class="card-body">
                    <h5 class="card-title fw-semibold">Instituto Tecnológico Superior</h5>
                    <p class="card-text">Formación técnica de alta calidad para el desarrollo
                    profesional.</p>
                    <p class="text-muted small mb-0">📍 Santiago, Chile</p>
                </div>
            </div>
        </div>
    )
}

export default Card