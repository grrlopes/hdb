angular.module("Hdb").factory("HdbApi",["$http", function($http){
  var _IndexaTabela = function(item){
    return $http.get("http://localhost:8001/indexatabela?"+'item='+item);
  };
  var _RemoveRegistro = function(valor){
    return $http.post("http://localhost:8001/excluir",valor);
  };
  var _Pesquisas = function(pesquisa,selecte){
    return $http.post("http://localhost:8001/pesquisas",
    {pesq:pesquisa,pag:0,total:selecte});
  };
  var _AdicionaRegistro = function(v){
    return $http.post("http://localhost:8001/cadastro",v);
  };
  var _Paginamuda = function(pag,selecte){
    return $http.post("http://localhost:8001/indexpg",{pag:pag,total:selecte});
  };
  var _AtualizaRegistro = function(sistema,funcao,comando,id){
    return $http.post("http://localhost:8001/altercad",{comando:comando,
    funcao:funcao,sistema:sistema,id:id})
  };
  var _PaginaPesquisa = function(pesquisa,pag,selecte){
    return $http.post("http://localhost:8001/pesquisas",{pesq:pesquisa,pag:pag,total:selecte});
  };
  var _Logar = function(login,senha){
    return $http.post("http://localhost:8001/login",{login:login,senha:senha});
  };
  return {
    IndexaTabela: _IndexaTabela,
    RemoveRegistro: _RemoveRegistro,
    Pesquisas: _Pesquisas,
    AdicionaRegistro: _AdicionaRegistro,
    Paginamuda: _Paginamuda,
    Logar: _Logar,
    AtualizaRegistro: _AtualizaRegistro,
    PaginaPesquisa: _PaginaPesquisa
  };
}]);
