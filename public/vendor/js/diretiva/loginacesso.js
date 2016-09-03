angular.module("Hdb").directive("tplLoginacesso", function(){
  return {
    templateUrl: 'views/loginacesso.ejs',
    restrict: "E",
    scope: false,
    link: function(scope){
      scope.rmAlerta = function(){
        scope.permissao = false;
      };
    }
  };
});
