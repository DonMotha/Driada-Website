const router = require("express").Router();
const {getInstitucion,getInstitucionesPrevias,updatePuntuacion} = require('../Controllers/Insti.controllers');
const {getBecas,getBecaById,createBeca,updateBeca,deleteBeca} = require('../Controllers/Becas.controllers');
const {RegistroUser,LoginUser} = require("../Controllers/User.controllers")
const {requireAuth} = require("../Middlewares/requireAuth")

//Instituciones
router.get("/institucionesPrevias", getInstitucionesPrevias);
router.get("/instituciones/:id", getInstitucion);
router.post("/instituciones/:id/updateOpinion",updatePuntuacion) 

// Becas

router.get("/becas", getBecas);
router.get("/becas/:id", getBecaById);
router.post("/becas", createBeca);
router.put("/becas/:id", updateBeca);
router.delete("/becas/:id", deleteBeca);

//Usuarios
router.post("/registro",RegistroUser)
router.post("/login",LoginUser)

router.get("/me",requireAuth,(req,res)=>{
    res.json({user:req.user})
})
module.exports = router;