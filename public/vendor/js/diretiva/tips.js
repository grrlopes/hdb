angular.module("Hdb").directive('tipTips', function(){
  return function(scope, element, attrs){
    element.tooltip({
      container: 'body',
      placement: 'auto',
      html: true,
      title: function(){
        var text = $(this).text();
        return text;
      }
    });
  };
});
