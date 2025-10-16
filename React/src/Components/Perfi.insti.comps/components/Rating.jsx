import { useState } from "react";
import { fetchUpdatePuntuacion } from "../../../api/instituciones";

function Rating({ institucionId, puntuacionActual, onRatingUpdate }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRating = async (valor) => {
        try {
            setLoading(true);
            setMessage("");

            // Llamar a la API para actualizar la puntuación
            await fetchUpdatePuntuacion(institucionId, valor);


            // Actualizar estado local
            setRating(valor);
            setMessage("¡Gracias por tu votación!");

            // Notificar al componente padre para que actualice los datos
            if (onRatingUpdate) {
                onRatingUpdate();
            }

        } catch (error) {
            console.error("Error al enviar puntuación:", error);
            setMessage("Error al enviar la puntuación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rating-section">
            <h5>Calificar esta institución</h5>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "star on" : "star off"}
                            onClick={() => handleRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            disabled={loading}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            
                <p className="mt-2">
                    Puntuación actual: <strong>{puntuacionActual}</strong>/5
                </p>
            
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mt-2`}>
                    {message}
                </div>
            )}
            {loading && <p>Enviando...</p>}
        </div>
    );
}

export default Rating