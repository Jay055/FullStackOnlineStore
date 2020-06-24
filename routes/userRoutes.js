
const express = require("express");
const router = express.Router();
// import controller 
const { signup } = require("../controllers/userController");




router.post("/signup", signup);



module.exports = router; 