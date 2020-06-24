
const express = require("express");
const router = express.Router();
// import controller 
const { sayHI } = require("../controllers/user");


router.get("/api", (req, res) => {
  res.send("hello Node")
});

router.get("/", sayHI);



module.exports = router; 