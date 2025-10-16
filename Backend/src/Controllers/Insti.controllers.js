const { ɵ_sanitizeUrl } = require("@angular/core");
const Institucion = require("../Models/InstitucionModel");
const { isValidObjectId } = require('mongoose'); 

//Instituciones previas manda todas las institucione pero con poca informacion, vista previa
const getInstitucionesPrevias = async (req, res) => {
  try { //saca solo los datos nombre, tipo y puntuacion
    const docs = await Institucion.find({}) //guarda en doc
      .select('_id nombre Nombre tipo Tipo puntuacion Puntuacion img Img')
      .lean();

    
    if (!docs.length) { //si data no tiene nada
      return res.status(200).json({ message: 'OK', data: [], count: 0 });
    }
    //los datos de la bd, map los recorre y los guarda en data
    const data = docs.map(d => ({
  id: String(d._id),
  nombre: d.nombre ?? d.Nombre ?? null,
  tipo: d.tipo ?? d.Tipo ?? null,
  puntuacion: d.puntuacion ?? d.Puntuacion ?? null,
  img:  ɵ_sanitizeUrl (d.img ?? null)  
    }));
    //retornas data y da el estatus 200
    return res.status(200).json({ message: 'Instituciones (preview)', data, count: data.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar instituciones (preview)' });
  }
};


//Institucion entrega toda la informacion de la institucion por el ID
const getInstitucion = async (req, res) => {
  const { id } = req.params; //si no mando el ID
  if (!id) return res.status(400).json({ message: 'ID requerido' });

  // quita esta validación si tu _id es string
  if (!isValidObjectId(id)) { //verifica que sea un ObjeId
    return res.status(400).json({ message: 'ID inválido (no es ObjectId)' });
  }

  try {
    const inst = await Institucion.findById(id).lean(); // trae todo
    if (!inst) return res.status(404).json({ message: 'Institución no encontrada' });

    // normaliza las claves de schema (por si hay mayúsculas/minúsculas distintas en el schema)
    const data = {
      _id: inst._id,
      nombre: inst.nombre ?? inst.Nombre ?? null,
      tipo: inst.tipo ?? inst.Tipo ?? null,
      localidad: inst.localidad ?? inst.Localidad ?? null,
      descripcion: inst.descripcion ?? inst.Descripcion ?? null,
      link: inst.link ?? inst.Link ?? null,
      img: inst.img ?? inst.Img ?? null,
      puntuacion: inst.puntuacion ?? inst.Puntuacion ?? null,
    };
    //manda data
    return res.status(200).json({ message: 'Institución (detalle)', data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener institución' });
  }
};

//PARA AGREGAR PUNTUACION Y ACTUALIZAR
const updatePuntuacion = async (req, res) => {
  try { //toma el id y el valor
    const { id } = req.params;
    const valor = Number(req.body?.valor);
    //el valor no es un numero entero en los rangos 1 a 5 
    if (!id || !(valor >= 1 && valor <= 5)) {
      return res.status(400).json({ message: 'valor 1..5 requerido' });
    }

    // Trae la institucion con todo
    const inst = await Institucion.findById(id)
      .select('Puntuacion puntuacion CantiOpiniones')
      .lean();
    //No lo encontro
    if (!inst) return res.status(404).json({ message: 'No existe' });
    //se le otorga los valores de puntuacion y cantidad de opiniones en variables
    //se normaliza por si el Sherma tnega una miniscula o una mayuscula
    const prevAvg   = inst.puntuacion ?? inst.Puntuacion ?? 0;
    const prevCount = inst.CantiOpiniones ?? 0;
    //crea un nuevo parametro con la cantidad de opiniones +1
    const newCount = prevCount + 1;
    //se calcula el nuevo promedio de opiniones
    const newAvg = Math.round(((prevAvg * prevCount + valor) / newCount) * 100) / 100;

    // Actualiza cantidad de opiniones y el promedio de estas 
    await Institucion.updateOne(
      { _id: id },
      {
        $set: { Puntuacion: newAvg, puntuacion: newAvg, CantiOpiniones: newCount }
      }
    );
    //retorna avisando que esta bien con los datos nuevos
    return res.json({
      ok: true,
      data: { _id: id, puntuacion: newAvg, CantiOpiniones: newCount }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error al actualizar' });
  }
};



module.exports={getInstitucion,getInstitucionesPrevias, updatePuntuacion}