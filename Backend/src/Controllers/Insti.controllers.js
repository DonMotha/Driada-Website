
const Institucion = require("../Models/InstitucionModel");
const { isValidObjectId } = require('mongoose'); 

// Helper para sanitizar URL (reemplazo simple de ɵ_sanitizeUrl de Angular)
// Si confías en tus datos de BD, puedes simplemente devolver la URL tal cual.
// Si quieres validar/sanitizar, usa una librería como 'validator' o lógica custom.
const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  // Validación básica: que empiece con http/https o sea relativa
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }
  // Si no es válida, retorna null o una URL por defecto
  return null;
};

// Instituciones previas: manda todas las instituciones pero con poca información, vista previa
const getInstitucionesPrevias = async (req, res) => {
  try {
    // Saca solo los datos nombre, tipo y puntuación
    const docs = await Institucion.find({})
      .select('_id nombre Nombre tipo Tipo puntuacion Puntuacion img Img')
      .lean();

    if (!docs.length) {
      return res.status(200).json({ message: 'OK', data: [], count: 0 });
    }

    // Los datos de la BD, map los recorre y los guarda en data
    const data = docs.map(d => ({
  id: String(d._id),
  nombre: d.nombre ?? d.Nombre ?? null,
  tipo: d.tipo ?? d.Tipo ?? null,
  puntuacion: d.puntuacion ?? d.Puntuacion ?? null,
  img: (d.img ?? null)  
    }));

    // Retornas data y da el estatus 200
    return res.status(200).json({ message: 'Instituciones (preview)', data, count: data.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar instituciones (preview)' });
  }
};

// Institución: entrega toda la información de la institución por el ID
const getInstitucion = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID requerido' });

  // Verifica que sea un ObjectId válido
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido (no es ObjectId)' });
  }

  try {
    const inst = await Institucion.findById(id).lean(); // Trae todo
    if (!inst) return res.status(404).json({ message: 'Institución no encontrada' });

    // Normaliza las claves de schema (por si hay mayúsculas/minúsculas distintas en el schema)
    const data = {
      _id: inst._id,
      nombre: inst.nombre ?? inst.Nombre ?? null,
      tipo: inst.tipo ?? inst.Tipo ?? null,
      localidad: inst.localidad ?? inst.Localidad ?? null,
      descripcion: inst.descripcion ?? inst.Description ?? null,
      link: sanitizeUrl(inst.link ?? inst.Link ?? null), // Sanitiza link también
      img: sanitizeUrl(inst.img ?? inst.Img ?? null),    // Sanitiza img
      puntuacion: inst.puntuacion ?? inst.Puntuacion ?? null,
    };

    // Manda data
    return res.status(200).json({ message: 'Institución (detalle)', data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener institución' });
  }
};

// Para agregar puntuación y actualizar
const updatePuntuacion = async (req, res) => {
  try {
    const { id } = req.params;
    const valor = Number(req.body?.valor);

    // El valor no es un número entero en los rangos 1 a 5
    if (!id || !(valor >= 1 && valor <= 5)) {
      return res.status(400).json({ message: 'valor 1..5 requerido' });
    }

    // Trae la institución con todo
    const inst = await Institucion.findById(id)
      .select('Puntuacion puntuacion CantiOpiniones')
      .lean();

    // No lo encontró
    if (!inst) return res.status(404).json({ message: 'No existe' });

    // Se le otorga los valores de puntuación y cantidad de opiniones en variables
    // Se normaliza por si el Schema tiene una minúscula o una mayúscula
    const prevAvg = inst.puntuacion ?? inst.Puntuacion ?? 0;
    const prevCount = inst.CantiOpiniones ?? 0;

    // Crea un nuevo parámetro con la cantidad de opiniones +1
    const newCount = prevCount + 1;

    // Se calcula el nuevo promedio de opiniones
    const newAvg = Math.round(((prevAvg * prevCount + valor) / newCount) * 100) / 100;

    // Actualiza cantidad de opiniones y el promedio de estas
    await Institucion.updateOne(
      { _id: id },
      {
        $set: { Puntuacion: newAvg, puntuacion: newAvg, CantiOpiniones: newCount }
      }
    );

    // Retorna avisando que está bien con los datos nuevos
    return res.json({
      ok: true,
      data: { _id: id, puntuacion: newAvg, CantiOpiniones: newCount }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error al actualizar' });
  }
};

module.exports = { getInstitucion, getInstitucionesPrevias, updatePuntuacion };