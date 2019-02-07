app.directive('formA',function(){
  return {
    restrict: 'E',
    templateUrl:'../views/unknown.html',
    link: function (scope,elem,attrs) {
      scope.test = 'this is from b'
    }
  }
});