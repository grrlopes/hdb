app.controller("HdbCtrl", ["$scope","$http", function($scope, $http){
  var IndexaTabela = function(item){
    $http.get("http://localhost:8000/indexatabela?"+'item='+item).success(function(data, status){
      $scope.valores = data;
      data.filter(function(v){
        if(v.size){
          $scope.pagtotal = v.size;
        }
      });
      data.pop();
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

  $scope.pesquisas = function(){
    var self = this;
    this.pesqvalid = true;
    this.pesquisa = $scope.pesquisa;
    console.log(this.pesquisa, this.pesqvalid);
    if(this.pesquisa == ''){
      this.pesqvalid = false;
      IndexaTabela($scope.selecte);
      return false;
    }
    $http.post("http://localhost:8000/pesquisas",{pesq:this.pesquisa,pag:0,total:$scope.selecte}).success(function(data){
      data.filter(function(v){
        if(v.size){
          $scope.pagtotal = v.size;
        }
      });
      data.pop();
      $scope.valores = data;
      console.log($scope.valores);
    });
  }

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

  $scope.selecte = 14;
  $scope.selector = [
    {item:5},{item:10},{item:14},{item:28}
  ];

  $scope.paginamuda = function(pag){
    var self = this;
    this.pesquisa = $scope.pesquisa;
    this.pag = ($scope.selecte*(pag-1));
    if($scope.pesquisa == undefined){
      $http.post("http://localhost:8000/indexpg",{pag:this.pag,total:$scope.selecte}).success(function(data){
        $scope.valores = data;
      });
    }else{
      $http.post("http://localhost:8000/pesquisas",{pesq:this.pesquisa,pag:this.pag,total:$scope.selecte}).success(function(data){
        $scope.valores = data;
      });
    }
  };

  $scope.EditaRegistro = function(){
    var self = this;
    self.btneditar = !self.btneditar;
    $scope.valoresfuncedit.filter(function(valor){
      if(valor.selecionado){
        $scope.cadastro = angular.copy(valor);
      }
    });
  };
  IndexaTabela($scope.selecte);
}]);
