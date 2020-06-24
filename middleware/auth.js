// Middleware for authentication with JWT (userRoutes.js)


const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res,next) {
  // Get token from header, can be seen in postman
  const token = req.header('x-auth-token');

  // If there's no token 
  if(!token) {
    return res.status(401).json({msg: 'No token, authorization denied'});

  }
  // Verify Token 
  try {
    // Decode toden 
    const decoded = jwt.verify(token, keys.jwtSecret);
    // assign decoded token to user 
    req.user = decoded.user; 
    next(); 

    // if token! valid 
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'});
  }
  };
