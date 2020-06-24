const keys = require('./config/keys');
// dotenv.config()
const express = require("express");
const app = express(); 
const mongoose = require('mongoose');

require('dotenv').config
// Set up ENV Variables 

const userRoutes = require('./routes/user')



//db connection 
mongoose.connect(keys.mongoURI, {
  // Pass parameters to avoid depreciation warning
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(()=> console.log('DB Connected'));







// Routes Middleware 
app.use(userRoutes)

const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

