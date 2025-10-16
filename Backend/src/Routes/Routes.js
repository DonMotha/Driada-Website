const router = require("express").Router();
const axios = require("axios");
const {getInstitucion,getInstitucionesPrevias,updatePuntuacion} = require('../Controllers/Insti.controllers');
const {getBecas,getBecaById,createBeca,updateBeca,deleteBeca} = require('../Controllers/Becas.controllers');
const {RegistroUser,LoginUser,me, updateMe} = require("../Controllers/User.controllers")
const {requireAuth,errorHandler} = require("../Middlewares/requireAuth")
const {getCarreras,getCarreraId} = require('../Controllers/Carreras.controllers');


// Instituciones
router.get("/institucionesPrevias", getInstitucionesPrevias);
router.get("/instituciones/:id", getInstitucion);
router.post("/instituciones/:id/updateOpinion",updatePuntuacion);



// Becas
router.get("/becas", getBecas);
router.get("/becas/:id", getBecaById);

// Carreras
router.get("/carreras", getCarreras);
router.get("/carreras/:id", getCarreraId);


//Usuarios
router.post("/registro",RegistroUser)
router.post("/login",LoginUser)
router.get("/me",requireAuth, me)
router.put("/me", requireAuth, updateMe)


module.exports = router;