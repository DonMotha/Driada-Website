const Beca = require("../Models/BecasModel");

// GET /api/becas?activa=true&institutionId=...&area=Educación%20Superior
const getBecas = async (req, res, next) => {
    try {
        const { activa, institutionId, area } = req.query;
        const filter = {};
        if (typeof activa !== "undefined") filter.activa = activa === "true";
        if (institutionId) filter.institutionId = institutionId;
        if (area) filter.areas = area;

        const items = await Beca.find(filter)
            .select('_id nombre Nombre tipo Tipo  descripcion Descripcion ')
            .lean();
        const data = items.map(b =>({
            _id:String(b._id),
            nombre:b.nombre ?? b.Nombre,
            tipo: b.tipo ?? b.tipo,
            descripcion: b.descripcion ?? b.Descripcion
        }))
        res.json(data);
    } catch (err) {
        next(err);
    }
};

// GET /api/becas/:id
const getBecaById = async (req, res, next) => {
    try {
        const beca = await Beca.findById(req.params.id)
            .lean();
        if (!beca) return res.status(404).json({ error: "Beca no encontrada" });
        res.json(beca);
    } catch (err) {
        next(err);
    }
};

// POST /api/becas
const createBeca = async (req, res, next) => {
    try {
        const creada = await Beca.create(req.body);
        res.status(201).json(creada);
    } catch (err) {
        next(err);
    }
};

// PUT /api/becas/:id
const updateBeca = async (req, res, next) => {
    try {
        const actualizada = await Beca.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizada);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/becas/:id
const deleteBeca = async (req, res, next) => {
    try {
        await Beca.findByIdAndDelete(req.params.id);
        res.json({ msg: "Beca eliminada" });
    } catch (err) {
        next(err);
    }
};

module.exports = { getBecas, getBecaById, createBeca, updateBeca, deleteBeca };