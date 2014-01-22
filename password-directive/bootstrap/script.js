angular.module('app', [])
  .directive('passwordField', ['$timeout',
    function($timeout) {
      return {
        restrict: 'E',
        scope: {
          stayOn: '@keepVisible'
        },
        replace: true,
        template: '<div class="input-group" ng-class="{\'has-error\': showPassword}">\
                    <span class="input-group-btn">\
                      <button class="btn" ng-class="{false:\'btn-primary\', true:\'btn-danger\'}[showPassword]" ng-mousedown="down()" ng-mouseup="up()" ng-mouseleave="check()">\
                        <i class="fa fa-eye"></i>\
                      </button>\
                    </span>\
                  </div>',
        compile: function(template) {
          var input = angular.element('<input type="{{input_type}}" class="form-control" ng-model="password">');
          template.prepend(input);
          return function(scope, elm, attr) {
            var mousedown = false;
            scope.input_type = 'password';
            scope.showPassword = false;

            scope.up = function() {
              mousedown = false;
              scope.input_type = 'password';
              scope.showPassword = false;
              input[0].focus();
            };

            scope.down = function() {
              mousedown = true;
              scope.input_type = 'text';
              scope.showPassword = true;
            };

            scope.check = function() {
              if (mousedown && scope.showPassword) {
                input[0].focus();
                scope.showPassword = false;
                scope.input_type = 'password';
              }
            };
          };
        }
      };
    }
  ]);