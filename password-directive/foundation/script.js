angular.module('app', [])
  .directive('passwordField', ['$timeout',
    function($timeout) {
      return {
        restrict: 'E',
        scope: {
          stayOn: '@keepVisible'
        },
        replace: true,
        template: '<div class="row collapse">\
                    <div class="small-2 columns">\
                      <button class="button postfix" ng-class="{\'alert\': showPassword}" ng-mousedown="down()" ng-mouseup="up()" ng-mouseleave="check()">\
                        <i class="fa fa-eye"></i>\
                      </a>\
                    </div>\
                  </div>',
        compile: function(template) {
          var input = angular.element('<input type="{{input_type}}" ng-model="password">');
          var container = angular.element('<div class="small-10 columns"></div>');
          container.append(input);
          template.prepend(container);
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
              input[0].focus();
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