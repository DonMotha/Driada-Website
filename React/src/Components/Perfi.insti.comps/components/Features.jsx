

function Features({ institucion }) {
    return (
        // <div className="col-md-2 text-align-center align-middle align-baseline perfilinsti-features">
        //     <div className="row "></div>
        //     <div>
        //         <button
        //             type="button"
        //             className="btn btn-success btn-sm perfilinsti-favos">
        //             Agregar a favoritos
        //         </button>
        //     </div>
        //     <div className="row "></div>
        //     <a href={institucion.link}>
        //         <button
        //             type="button"
        //             className="btn btn-outline-info perfilinsti-moreinfo">
        //             Más información
        //         </button>
        //     </a>

        // </div>
        <div className="perfilinsti-features h-100">
    <div className="d-flex flex-column justify-content-center h-100 gap-2">
        <button
            type="button"
            className="btn btn-success btn-sm perfilinsti-favos">
            Agregar a favoritos
        </button>
        
        <a href={institucion.link} target="_blank" rel="noopener noreferrer">
            <button
                type="button"
                className="btn btn-outline-info perfilinsti-moreinfo w-100">
                Más información
            </button>
        </a>
    </div>
</div>
    );
}

export default Features;
