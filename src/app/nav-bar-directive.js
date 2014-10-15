angular.module('app')
    .directive('navBar', function ($route, UserService) {
        return {
            restrict: 'A',
            replace: true,
            template: '<nav class="navbar navbar-default" role="navigation">' +
                '<div class="container-fluid">' +
                '<ul class="nav navbar-nav">' +
                '<li ng-repeat="link in links"><a ng-href="#{{link.path}}" ng-bind="link.label"></a></li>' +
                '</ul>' +
                '<ul class="nav navbar-nav navbar-right" ng-bind="userName">' +
                '</ul>' +
                '</div>' +
                '</nav>',
            link: function ($scope) {
                var links = [];

                angular.forEach($route.routes, function (route) {
                    if (!route.redirectTo) {
                        links.push({path: route.originalPath, label: route.originalPath});
                    }
                });

                $scope.links = links;

                // use the current user info
                UserService.getUserInfo().then(bindUserName);

                function bindUserName(userInfo) {
                    $scope.userName = userInfo.userName;
                }
            }
        };
    });
