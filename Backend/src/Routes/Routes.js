const router = require("express").Router();
const {getInstitucion,getInstitucionesPrevias,updatePuntuacion} = require('../Controllers/Insti.controllers');
const {getBecas,getBecaById,createBeca,updateBeca,deleteBeca} = require('../Controllers/Becas.controllers');
const {RegistroUser,LoginUser,me} = require("../Controllers/User.controllers")
const {requireAuth,errorHandler} = require("../Middlewares/requireAuth")
const {getCarreras,getCarreraId} = require('../Controllers/Carreras.controllers');


// Instituciones
router.get("/institucionesPrevias", getInstitucionesPrevias);
router.get("/instituciones/:id", getInstitucion);
router.post("/instituciones/:id/updateOpinion",updatePuntuacion) 


// Becas
router.get("/becas", getBecas);
router.get("/becas/:id", getBecaById);
router.post("/becas", createBeca);
router.put("/becas/:id", updateBeca);
router.delete("/becas/:id", deleteBeca);


// Carreras
router.get("/carreras", getCarreras);
router.get("/carreras/:id", getCarreraId);


//Usuarios
router.post("/registro",RegistroUser)
router.post("/login",LoginUser)
router.get("/me",requireAuth, me)


module.exports = router;