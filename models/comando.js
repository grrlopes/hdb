module.exports = function(){
  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;
  mongoose.connect('mongodb://localhost/hdb', function(err){
    if (err){
      console.log('Erro ao conectar no mongodb: ' + err);
    }
  });
  var comando = new Schema({
    autor: String,
    sistema: String,
    funcao: String,
    comando: String,
  });
  return mongoose.model('comandos', comando);
}
