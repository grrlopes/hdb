"use strict";
module.exports = function(app){
  var comando = app.models.comando;
  var hdb_controller = {

    index: function(req, res){
      res.render("index");
    },

    indexatabela: function(req, res){
      console.log(req.query.item);
      var size;
      comando.count(function(err, data){
        if(err){
          console.log(err);
        }
          size = data;
      });
      comando.find(function(error, data){
        if(error){
          console.error(error);
        }else{
          data.push({size: size});
          res.send(data);
        }
      }).skip(0).limit(parseInt(req.query.item));
    },

    indexpg: function(req, res){
      console.log(req.body.pag, req.body.total);
      comando.find(function(error, data){
        if(error){
          console.error(error);
        }else{
          res.send(data);
        }
      }).skip(parseInt(req.body.pag)).limit(parseInt(req.body.total));
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

    pesquisas: function(req, res, next){
      var pesquisas = req.body.pesq;
      console.log(req.body.pag, req.body.total);
      var size;
      comando.find({ $or:[ {'sistema':{$regex: '^'+pesquisas, $options: 'i'}},
      {'funcao': {$regex: '^'+pesquisas, $options: 'i'}}, {'comentario': {$regex: '^'+pesquisas, $options: 'i'}} ]},
      function(err, data){
				if(err){
					console.error(err);
				}else{
          size = data.length;
				}
			});
      comando.find({ $or:[ {'sistema':{$regex: '^'+pesquisas, $options: 'i'}},
      {'funcao': {$regex: '^'+pesquisas, $options: 'i'}}, {'comentario': {$regex: '^'+pesquisas, $options: 'i'}} ]},
      function(err, data){
				if(err){
					console.error(err);
				}else{
          data.push({size: size});
          res.send(data);
				}
			}).skip(parseInt(req.body.pag)).limit(parseInt(req.body.total));
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
