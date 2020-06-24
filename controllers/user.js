// Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
// We would pass our controllers to our routes 

exports.sayHI = (req, res) => {
  res.json({ message: "hello there"});
};