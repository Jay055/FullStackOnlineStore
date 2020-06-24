const express = require("express");
const app = express(); 

// Set up ENV Variables 
require('dotenv').config

app.get("/", (req, res) => {
  res.send("hello from node");

});


const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});