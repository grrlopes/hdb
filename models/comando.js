module.exports = function(){
  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;
  var comando = new Schema({
    autor: {type: String, default: ""},
    sistema: {type: String, default: ""},
    funcao: {type: String, default: ""},
    comando: {type: String, default: ""},
    data: {type: Date}
  });
  return mongoose.model('comandos', comando);
}
