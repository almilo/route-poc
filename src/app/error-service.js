angular.module('app')
    .factory('ErrorService', function () {
        var error;

        return {
            getError: getError,
            setError: setError
        };

        function getError() {
            return error;
        }

        function setError(errorValue) {
            error = errorValue;
        }
    });
