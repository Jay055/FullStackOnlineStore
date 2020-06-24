const mongoose = require('mongoose')
// Hash Password 
const crypo = require('crypto')

// Unique number generator 
const uuidv1 = require('uuid/v1');


const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    trim: true, 
    required: true,
    maxlength: 32,
    minlength:3
  },

  email: {
    type: String, 
    trim: true,
    required: true, 
    unique: 32
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    trim: true,
  },
  // used to generate the hashed password
  salt: String,
  role: {
    type: Number, 
    default: 0
  },
  // default 
  history: {
    type: Array, 
    default: []
    }
  },
 {timestamps:true},

);


// export User (modal name, Schema)
module.exports = User = mongoose.model('user', UserSchema);