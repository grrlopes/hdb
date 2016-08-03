module.exports = function(app){
	var hdb = app.controllers.hdb;
	app.get('/', hdb.index);
	app.get('/indexatabela', hdb.indexatabela);
}
