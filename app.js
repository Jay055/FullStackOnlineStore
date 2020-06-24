const keys = require('./config/keys');
// dotenv.config()
const express = require("express");
const app = express(); 
const mongoose = require('mongoose');
// 
const bodyParser = require('body-parser');
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const cookieParser = require('cookie-parser')
// http request logger middleware 
const morgan = require('morgan')
require('dotenv').config
// Set up ENV Variables 

const userRoutes = require('./routes/userRoutes')





//db connection 
mongoose.connect(keys.mongoURI, {
  // Pass parameters to avoid depreciation warning 
  useNewUrlParser: true,
      
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then(()=> console.log('DB Connected'));




// Middlewares 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());

// Routes Middleware 
app.use("/api", userRoutes)

const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

