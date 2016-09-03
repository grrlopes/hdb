angular.module("Hdb").directive("tplLogin", function(){
  return {
    templateUrl: "views/formlogin.ejs",
    replace: true,
    restrict: "E",
    scope: true,
    link: function (scope, element, attrs){
      scope.$watch(attrs.visible, function(value){
        if(value == true){
         var deleta = angular.element(document.querySelector('#tira ul')).remove();
         element.prepend(
           '<div class="col-lg-4 collapsee navbar-collapse"><ul class="nav navbar-nav"><li class="dropdown"> \
            <a class="dropdown-toggle logout" data-toggle="dropdown" role="button" \
            aria-haspopup="true" aria-expanded="false">'+scope.perfil+' <span class="caret"></span> \
            </a><ul class="dropdown-menu"><li><a href="/logout">Sair</a></li></ul></li></ul></div>'
         );
         return deleta;
       }
      });
    }
  };
});
