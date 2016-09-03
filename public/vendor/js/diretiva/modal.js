angular.module("Hdb").directive('modal', function (){
    return {
      templateUrl: 'views/modal.ejs',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: true,
      link: function(scope, element, attrs){
        scope.title = attrs.title;
        scope.$watch(attrs.visible, function(value){
          console.log(value);
          if(value == true){
            $(element).modal({
              backdrop: 'static',
              show: true
            });
          }
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
