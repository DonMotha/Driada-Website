const Carrera = require('../Models/CarrerasModel');
const { isValidObjectId } = require('mongoose');


// Obtener info de todas las carreras
const getCarreras = async (req, res) => {
    try {
        const carreras = await Carrera.find({})
        .select('_id nombre NOMBRE tipo Tipo descripcion DESCRIPCION')
        .lean();
        
        if (!carreras || carreras.length === 0) {
            return res.status(404).json({ message: 'No se encontraron carreras' });
        }

        // Mapear los datos para mantener consistencia con getCarrera
        const data = carreras.map(carr => ({
            _id: carr._id,
            nombre: carr.Nombre ?? carr.NOMBRE ,
            tipo: carr.tipo ?? carr.Tipo,
            descripcion: carr.Descripcion ?? carr.DESCRIPCION ,
        }));

        return res.status(200).json({ 
            message: `Carreras`, 
            data 
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener las carreras' });
    }
};


// Obtener info de carrera por id
const getCarreraId = async (req,res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID inválido (no es ObjectoID)' });
    }

    try {
        const carr = await Carrera.findById(id).lean();
        if (!carr) return res.status(404).json({ message: 'Carrera no encontrada' });

        const data = {
            _id: carr._id,
            nombre: carr.Nombre ?? carr.NOMBRE ?? null,
            empleabilidad: carr.Empleabilidad ?? carr.EMPLEABILIDAD ?? null,
            sueldopromedio: carr.SueldoPromedio ?? carr.SUELDOPROMEDIO ?? null,
            descripcion: carr.Descripcion ?? carr.DESCRIPCION ?? null,
            palabras_c: carr.Palabras_C ?? carr.PALABRAS_C ?? null,
            universidades_ids: carr.Universidades_Ids ?? carr.UNIVERSIDADES_IDS ?? null,
            area: carr.Area ?? carr.Area ?? carr.AREA ?? null
        };

        return res.status(200).json({ message: 'Detalle de carrera', data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener carrera' });
    }
};

module.exports = { getCarreras , getCarreraId }