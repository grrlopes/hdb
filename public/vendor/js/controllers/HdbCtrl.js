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

  $scope.checkselecionado = function(valores){
    $event.stopPropagation();
    $scope.selecionado = valores.some(function(valor){
      return valor.selecionado;
    });
  };

  $scope.TrMarcado = function(valores,valor){
    $scope.funcedit = valor;
    $scope.valoresfuncedit = valores;
    $scope.selecionado = valor.selecionado = !valor.selecionado;
    var self = this;
    self.selecao = true;
    self.tamanho = 0;
    valores.filter(function(v){
      if(v.selecionado)self.tamanho +=1;
    });
    if(self.tamanho > 1 || self.tamanho == 0){
      $scope.editar = false;
    }else{
      $scope.editar = true;
    }
    if(self.tamanho > 0){
      $scope.selecao = true;
    }else{
      $scope.selecao = false;
    }
    $(".modal").modal("hide");
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

  $scope.pageChanged = function(newPage) {
      console.log(newPage+' '+'kk');
    };

  $scope.selecte = 14;
  $scope.selector = [
    "5","10","14","28"
  ];

  $scope.EditaRegistro = function(){
    var self = this;
    self.btneditar = !self.btneditar;
    $scope.valoresfuncedit.filter(function(valor){
      if(valor.selecionado){
        $scope.cadastro = angular.copy(valor);
      }
    });
  };

  IndexaTabela();

}]);
