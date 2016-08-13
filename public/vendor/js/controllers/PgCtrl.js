app.controller("PgCtrl", ["$scope", function($scope){
  $scope.caixa = [];
  $scope.quantidade = 10;
  $scope.pagina = 1
  $scope.inicio = ($scope.quantidade * $scope.pagina) - $scope.quantidade;
  $scope.total_registro = 50;
  $scope.tatal_paginas = Math.ceil($scope.total_registro/$scope.quantidade);

  $scope.CalculaPagina = function() {
    for (i=1;i<=$scope.tatal_paginas;i++) {
      $scope.caixa.push({"numero":i});
    }
  };
  $scope.CalculaPagina();


  $scope.contador = 0;
  $scope.$watch('myText', function(novovalor, velhovalor){
      console.log('novo: '+novovalor);
      console.log('velho: '+velhovalor);
      $scope.contador++;
  });

}]);
