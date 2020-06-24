// Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
// We would pass our controllers to our routes 

const User = require('../models/userModel');

const bcrypt = require('bcrypt');
// Express Validators 
const {
  check,
  validationResult
} = require('express-validator');



// exports.signup = (req, res) => {
//   console.log("req.body", req.body)
//   const user = new User(req.body)
//   // res.json({ message: "hello there"});
//   user.save((err, user) => {
//     if(err) {
//       return res.status(400).json({
//         err
//       });
//     }
//     res.json({
//       user
//     })

//   });
// };




exports.signup =  
[check('name', 'Name is required')
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
          // // Hash password with plain password and salt 
          user.password = await bcrypt.hash(password, salt);
          // save user 
          await user.save();

} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
}
