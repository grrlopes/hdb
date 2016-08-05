module.exports = function(){
  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;

  var comando = new Schema({
    autor: String,
    sistema: String,
    funcao: String,
    comando: String,
    data: Date
  });
  return mongoose.model('comandos', comando);
}
