
const express = require("express");
const router = express.Router();
const keys = require("../config/keys")
const bcrypt = require('bcrypt');
// import controller 

const jwt = require('jsonwebtoken');
// Express Validators 
const {
  check,
  validationResult
} = require('express-validator');




// Auth Users using post request with validators 

const User = require('../../models/User');
  // @route GET api/auth
  // @DESC  Test Route 
  // @access Public 

  // 


router.post(
  "/signup", [check('name', 'Name is required')
  .not()
  .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password',
  'Please enter a password with 6 or more characters')
  .isLength({
    min:6
  })
],
async(req, res)=>{
  // Returns error with express-validation if errors are detected 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors:errors.array()
    });
  }
  
  // Destructure req.body
  const {
    name, 
    email, 
    password
  } = req.body

  try {
    // Check if user exists 
    let user = await User.findOne({
      email
    });

    if (user) {
      return res
        .status(400)
          .json({
            errors: [{
              msg: 'User already exists'
            }]
          });
    }
    //  Create user -- 
     user = new User({
                name,
                email,
                password
            });
            // Encrypt password - generate salf from documentation, encryption goes higher with values (10)
            const salt = await bcrypt.genSalt(10);
            // Hash password with plain password and salt 
            user.password = await bcrypt.hash(password, salt);
            // save user 
            await user.save();

            // Return JSONwebtoken 
            // Create payload 
            const payload = {
              user: {
                id: user.id
              }
            };

            // pass secret key, set timing, return jwt to client 
            jwt.sign(
              payload, 
              keys.jwtSecret,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({token})
              }

            )
            
            // res.json({user})
            




  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}



)



module.exports = router; 