const express = require("express");
const router = express.Router();


// Controllers

const becas = require("../Controllers/Becas.controllers");


// Becas

router.get("/becas", becas.getBecas);
router.get("/becas/:id", becas.getBecaById);
router.post("/becas", becas.createBeca);
router.put("/becas/:id", becas.updateBeca);
router.delete("/becas/:id", becas.deleteBeca);


module.exports = router;