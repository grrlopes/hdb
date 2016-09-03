app.controller("HdbCtrl", ["$scope", "HdbApi", function($scope, HdbApi){
  var IndexaTabela = function(item){
    $scope.permissao = false;
    HdbApi.IndexaTabela(item).success(function(data, status){
      $scope.valores = data;
      data.filter(function(v){
        if(v.size){
          $scope.pagtotal = v.size;
        }else if(v.validacesso == true || v.validacesso == false){
          $scope.liberalogin = v.validacesso;
        }else if(v.login){
          $scope.perfil = v.login;
        }
      });
      for(var i = 0; i <= 2; i++){
        data.pop();
      }
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
      delete $scope.cadastro;
    }else{
      $scope.editar = true;
    }
    if(self.tamanho > 0){
      $scope.selecao = true;
    }else{
      $scope.selecao = false;
    }
  };

  $scope.aparececad = false;
  $scope.btncadastro = function(){
    $scope.classaparececad = true;
    $scope.aparececad = !$scope.aparececad;
  };

  $scope.RemoveRegistro = function(valores){
    if(!$scope.liberalogin){
      $scope.permissao = !$scope.liberalogin
      return false;
    }
    $scope.valores = valores.filter(function(valor){
      if(valor.selecionado){
        HdbApi.RemoveRegistro(valor);
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
    this.selecte = $scope.selecte;
    if(this.pesquisa == ''){
      this.pesqvalid = false;
      IndexaTabela(this.selecte);
      return false;
    }
    HdbApi.Pesquisas(this.pesquisa,this.selecte).success(function(data){
      data.filter(function(v){
        if(v.size){
          $scope.pagtotal = v.size;
        }
      });
      data.pop();
      $scope.valores = data;
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
      HdbApi.AdicionaRegistro(v);
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
    this.selecte = $scope.selecte;
    this.pag = (this.selecte*(pag-1));
    if($scope.pesquisa == undefined){
      HdbApi.Paginamuda(this.pag,this.selecte).success(function(data){
        $scope.valores = data;
      });
    }else{
      HdbApi.PaginaPesquisa(this.pesquisa,this.pag,this.selecte).success(function(data){
        $scope.valores = data;
      });
    }
    $scope.editar = false;
    $scope.selecao = false;
    delete $scope.cadastro;
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

  $scope.liberalogin = false;
  $scope.Logar = function(login){
    var usuario = login.usuario;
    var senha = login.senha;
    HdbApi.Logar(usuario,senha).success(function(data){
      if(data){
        $scope.liberalogin = true;
        $scope.perfil = usuario;
      }else{
        $scope.liberalogin = false;
      }
    });
  };

  $scope.AtualizaRegistro = function(cadastro){
    if(cadastro._id == undefined) return false;
    HdbApi.AtualizaRegistro(cadastro.sistema,cadastro.funcao,
    cadastro.comando,cadastro._id);
    $scope.permissao = !$scope.liberalogin;
    if(!$scope.liberalogin) return false;
    $scope.valores.filter(function(valor){
      if(valor.selecionado){
        valor.sistema = cadastro.sistema;
        valor.funcao = cadastro.funcao;
        valor.comando = cadastro.comando;
      }
      delete $scope.cadastro;
    });
  };

  $scope.showModal = false;
  $scope.toggleModal = function(valor){
    $scope.showModal = !$scope.showModal;
    $scope.modview = valor;
  };

  IndexaTabela($scope.selecte);
}]);
