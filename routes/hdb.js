module.exports = function(app){
	var hdb = app.controllers.hdb;
	app.get('/', hdb.index);
	app.post('/cadastro', hdb.addcad);
	app.get('/indexatabela', hdb.indexatabela);
	app.post('/excluir', hdb.excluir);
	app.post('/indexpg', hdb.indexpg);
	app.post('/pesquisas', hdb.pesquisas);
	app.post('/altercad', hdb.altercad);
	app.post('/login', hdb.loging);
	app.get('/logout', hdb.logout);
}
