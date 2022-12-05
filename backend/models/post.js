const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  nombre: {type: String, required: true}, //Mongoose.com //Cuando es en fronent es string en backend String
  estado: {type: String, required: true},
  ciudad: {type: String, required: true},
  sucursal: {type: String, required: true},
  servicio: {type: String, required: true},
  calificacionServicio: {type: String, required: true},
  recomendacion: {type: String, required: true},
});

module.exports = mongoose.model('Encuesta', postSchema);
