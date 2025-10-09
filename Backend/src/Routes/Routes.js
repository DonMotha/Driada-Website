const router = require("express").Router();
const {getInstitucion,getInstitucionesPrevias,updatePuntuacion} = require('../Controllers/Insti.controllers');
const {getBecas,getBecaById,createBeca,updateBeca,deleteBeca} = require('../Controllers/Becas.controllers');


router.get("/institucionesPrevias", getInstitucionesPrevias);
router.get("/instituciones/:id", getInstitucion);
router.post("/instituciones/:id/updateOpinion",updatePuntuacion) 



// Controllers




// Becas

router.get("/becas", getBecas);
router.get("/becas/:id", getBecaById);
router.post("/becas", createBeca);
router.put("/becas/:id", updateBeca);
router.delete("/becas/:id", deleteBeca);


module.exports = router;