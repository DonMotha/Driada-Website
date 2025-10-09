const express = require("express");
const cors= require("cors");
const router = require("../Routes/Routes")
const morgan= require("morgan");

const app= express();

app.use(cors());
app.use(express.json());       
app.use(morgan('dev'));

app.use("/api",router);



module.exports = app;