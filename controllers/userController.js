// Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
// We would pass our controllers to our routes 

const User = require('../models/userModel');



exports.signup = (req, res) => {
  console.log("req.body", req.body)
  const user = new User(req.body)
  // res.json({ message: "hello there"});
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({
        err
      });
    }
    res.json({
      user
    })

  });
};