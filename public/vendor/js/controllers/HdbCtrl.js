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

  $scope.checkselecionado = function($event, valores){
    $event.stopPropagation();
    $scope.selecionado = valores.some(function(valor){
      return valor.selecionado;
    });
  };

  $scope.TrMarcado = function($event, valor){
    $event.stopPropagation();
    $scope.selecionado = valor.selecionado = !valor.selecionado;
  };

  $scope.aparececad = false;
  $scope.btncadastro = function(){
    $scope.classaparececad = true;
    $scope.aparececad = !$scope.aparececad;
  };

  $scope.RemoveRegistro = function(valores){
    $scope.valores = valores.filter(function(valor){
      if(valor.selecionado){
        $http.post("http://localhost:8000/excluir", valor);
      }
      if(!valor.selecionado){
        return valor;
      }
    });
  };

  $scope.AdicionaRegistro = function(cadastro){
    $scope.data = new Date();
    $scope.valor = [];
    $scope.add = function(){
      $scope.valor.push({
        sistema: cadastro.sistema, funcao: cadastro.funcao,
        comando: cadastro.comando, data: $scope.data
      });
    };
    $scope.add();
    $scope.valor.forEach(function(v){
      $http.post("http://localhost:8000/cadastro", v);
      $scope.valores.unshift(v);
    });
    delete $scope.cadastro;
  };

  $scope.EditaRegistro = function(valor){
    console.log(valor.sistema);
    $scope.sistema = valor.sistema;
    $scope.editar = !$scope.editar;
  };

  IndexaTabela();
}]);
