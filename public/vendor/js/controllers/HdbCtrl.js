app.controller("HdbCtrl", ["$scope","$http", function($scope, $http){
  var IndexaTabela = function(){
    $http.get("http://localhost:8000/indexatabela").success(function(data, status){
      $scope.valores = data;
    });
  };

  $scope.ordenar = function(order){
    $scope.ordernacao = order;
    $scope.reordenacao = !$scope.reordenacao;
  };

  $scope.checkselecionado = function(selecao){
    $scope.selecionado = selecao.some(function(valor){
      return valor.selecionado;
    });
  };

  $scope.btncadastro = function(){
    var self = this;
    $scope.aparececad = false;
    $scope.aparececad = !$scope.aparececad;

  };

  IndexaTabela();
}]);
