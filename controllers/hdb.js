"use strict";
module.exports = function(app){
  var comando = app.models.comando;
  var hdb_controller = {

    index: function(req, res){
      res.render("index");
    },

    indexatabela: function(req, res){
      comando.find(function(error, data){
        if(error){
          console.error(error);
        }else{
          res.send(data);
        }
      });
    }

  }

  return hdb_controller;
}
