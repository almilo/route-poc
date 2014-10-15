angular.module('app')
    // mock API service
    .factory('ApiService', function($q) {
        return {
            get: get
        };

        function get() {
            return $q.when({version: '2.3.1'});
        }
    })
    .factory('RouteErrorHandlerService', function ($location, ApiService, ErrorService) {
        return function (event, currentRoute, previousRoute, rejection) {
            var rejectionString = '; Rejection: "' + rejection +
                '", Current path: "' + currentRoute.originalPath +
                '", Previous path: "' + (previousRoute ? previousRoute.originalPath : undefined) + '"';

            ApiService.get().then(showApiVersionAndRedirectToError, showServerOfflineAndRedirectToMaintenance);

            function showApiVersionAndRedirectToError(api) {
                console.log('API "' + api.version + '" ' + rejectionString);
                redirectTo('/error');
            }

            function showServerOfflineAndRedirectToMaintenance(reason) {
                console.log('Server offline!: ' + JSON.stringify(reason) + rejectionString);
                redirectTo('/maintenance');
            }

            function redirectTo(newPath) {
                if ($location.path() !== newPath) {
                    $location.path(newPath);
                }
            }
        }
    });
