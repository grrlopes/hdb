"use strict";
module.exports = function(app){
  var comando = app.models.comando;
  var Basead = app.models.adldap;
  var hdb_controller = {
    index: function(req, res){
      res.render("index");
    },

    indexatabela: function(req, res){
      var size;
      comando.count(function(err, data){
        if(err){
          console.error(err);
        }
          size = data;
      });
      comando.find(function(error, data){
        if(error){
          console.error(error);
        }else{
          data.push({size: size});
          req.session.login === undefined ? data.push({validacesso:false}) : data.push({validacesso:true});
          if(req.session.login === undefined){
            data.push({login: false});
          }else{
            data.push({login: req.session.login});
          }
          res.send(data);
        }
      }).skip(0).limit(parseInt(req.query.item));
    },

    indexpg: function(req, res){
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
				res.sendStatus(200);
			});
		},

    pesquisas: function(req, res, next){
      var pesquisas = req.body.pesq;
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
      {'funcao': {$regex: '^'+pesquisas, $options: 'i'}}, {'comando': {$regex: '^'+pesquisas, $options: 'i'}} ]},
      function(err, data){
				if(err){
					console.error(err);
				}else{
          data.push({size: size});
          res.send(data);
				}
			}).skip(parseInt(req.body.pag)).limit(parseInt(req.body.total));
    },

    altercad: function(req, res){
      var id = req.body.id;
      if(req.session.login == undefined){
        res.send(true);
      }else{
        comando.findOne({_id: id}, function(err, data){
          if(err){
            console.error(err);
          }else{
              var atualiza	= data;
              atualiza.sistema = req.body.sistema;
              atualiza.funcao = req.body.funcao;
              atualiza.comando = req.body.comando;
              atualiza.save(function(err){
                if(err){
                  console.error(err);
                }else{
                  res.send(false);
                }
              });
          }
        });
      }
    },

    loging: function(req, res, next){
			var login=req.body.login,
	    senha=req.body.senha;

      if(login !== 'gabriel.lopes'){
        req.session.destroy();
        res.send(false);
      }else{
        req.session.login=login;
        res.send(true);
      }
      /*
			Basead.authenticate(login+'@indproj.com.br',
			senha, function(err, auth){
			  if(err){
					req.session.destroy();
					res.send(auth);
			  }else{
					req.session.login=login;
					res.send(auth);
				}
			});  */
		},

    excluir: function(req, res){
      if(req.session.login == undefined){
        res.sendStatus(200);
      }else{
  			comando.remove({_id: req.body._id}, function(err){
  				if(err){
  					console.error(err);
  				}else{
            res.sendStatus(200);
          }
  			});
  		}
    },

    logout: function(req, res){
			req.session.destroy(function(err){
				if(err){
					console.error(err);
				}else{
					res.redirect('/');
				}
			});
		}
  }
  return hdb_controller;
}
