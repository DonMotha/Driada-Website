const router = require("express").Router();
const {getInstitucion,getInstitucionesPrevias,updatePuntuacion} = require('../Controllers/Insti.controllers');


router.get("/institucionesPrevias", getInstitucionesPrevias);
router.get("/instituciones/:id", getInstitucion);
router.post("/instituciones/:id/updateOpinion",updatePuntuacion) 



module.exports = router;