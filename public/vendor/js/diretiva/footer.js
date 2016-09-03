angular.module("Hdb").directive("tplFooter", function(){
  return {
    templateUrl: "views/footer.ejs",
    replace: true,
    restrict: "E"
  };
});
