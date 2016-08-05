module.exports = function(app){
	var hdb = app.controllers.hdb;
	app.get('/', hdb.index);
	app.get('/indexatabela', hdb.indexatabela);
	app.post('/cadastro', hdb.addcad);
	app.post('/excluir', hdb.excluir);
}
