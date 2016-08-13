"use strict";
module.exports = function(app){
  var comando = app.models.comando;
  var hdb_controller = {

    index: function(req, res){
      res.render("index");
    },

    indexatabela: function(req, res){
      var size;
      comando.count(function(err, data){
        if(err){
          console.log(err);
        }
          size = Math.ceil(data/10);
          console.log(size);
      });
      comando.find(function(error, data){
        if(error){
          console.error(error);
        }else{
          res.send(data);
        }
      }).skip(0).limit(10);
    },

    addcad: function(req, res){
			var inserir = new comando(req.body);
			inserir.save(function(err){
				if(err){
					console.error(err);
				}
        console.log(inserir);
				res.sendStatus(200);
			});
		},

    excluir: function(req, res){
      console.log(req.body._id);
			comando.remove({_id: req.body._id}, function(err){
				if(err){
					console.error(err);
				}else{
          res.sendStatus(200);
        }
			});
		},

  }
  return hdb_controller;
}
