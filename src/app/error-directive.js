angular.module('app')
    .directive('error', function (ErrorService) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div>{{error}}</div>',
            link: function ($scope) {
                $scope.$watch(ErrorService.getError, function (error) {
                    $scope.error = error;
                });
            }
        };
    });
