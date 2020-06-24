// keys.js - figues out what set of credentials to return 
//  Check which environment we are running our server
if (process.env.NODE_ENV === 'production') {
  // we are in productoin -- return production set of keys 
  module.exports = require('./prod')
} else { 
  // we are in development -- return development set of keys 
  module.exports = require('./dev')
}








