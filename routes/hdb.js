module.exports = function(app){
	var hdb = app.controllers.hdb;
	app.get('/', hdb.index);
	app.post('/cadastro', hdb.addcad);
	app.get('/indexatabela', hdb.indexatabela);
	app.post('/excluir', hdb.excluir);
	app.post('/indexpg', hdb.indexpg);
	app.post('/pesquisas', hdb.pesquisas);
}
