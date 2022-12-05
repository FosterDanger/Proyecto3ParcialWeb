const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  usuario: {type: String, required: true}, //Mongoose.com //Cuando es en fronent es string en backend String
  email: {type: String, required: true},
  contraseña: {type: String, required: true}
});

module.exports = mongoose.model('login', postSchema);
