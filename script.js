angular.module('app', [])
  .directive('passwordField', ['$timeout',
    function($timeout) {
      return {
        restrict: 'E',
        // scope: {},
        compile: function(template) {
          var container = angular.element('<div class="input-group" ng-class="{\'has-error\': showPassword}">\
<span class="input-group-btn">\
<button class="btn" ng-class="{false:\'btn-default\', true:\'btn-danger\'}[showPassword]" ng-mousedown="toggle()" ng-mouseup="toggle()" ng-mouseleave="check()">\
<i class="fa fa-eye"></i>\
</button>\
</span>\
</div>');
          var pwinput = angular.element('<input type="password" class="form-control" ng-show="!showPassword" ng-model="password">');
          var clearinput = angular.element('<input type="text" class="form-control" ng-show="showPassword" ng-model="password">');
          container.prepend(pwinput);
          container.prepend(clearinput);
          template.append(container);
          return function(scope, elm, attr) {
            scope.showPassword = false;
            scope.toggle = function() {
              scope.showPassword = !scope.showPassword;
              if (!scope.showPassword) {
                $timeout(function() {
                  clearinput[0].focus();
                });
              } else {
                $timeout(function() {
                  pwinput[0].focus();
                });
              }
              if (scope.autohide) {
                $timeout(function(){
                  if (scope.showPassword) {
                    scope.showPassword = !scope.showPassword;
                    $timeout(function() {
                      pwinput[0].focus();
                    });
                  }
                }, 1000);
              }
            };
            scope.check = function() {
              
              if (scope.showPassword) {
                scope.showPassword = !scope.showPassword;
              } 
            };
          };
        }
      };
    }
  ]);