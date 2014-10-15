angular.module('app')
    .factory('UserService', function ($q) {
        return {
            getUserInfo: getUserInfo,
            checkHasRoles: checkHasRoles
        };

        // use this method to share the current user info through all the application (see nav-bar-directive.js)
        function getUserInfo() {
            // substitute $q.when() with the $resource $promise and use the $resource cache option to cache the result
            // and avoid unnecessary calls once the use information has been loaded
            var userInfo = $q.when({
                userName: 'John Smith',
                useralias: 'Jonny',
                userlocale: 'de-CH',
                roles: ['user']
            });

            return userInfo.then(setUserLanguage);

            function setUserLanguage(userInfo) {
                // in case that the translate plugin language is different, set the translate plugin language to match
                // the user locale
                console.log('Langauge set to "' + userInfo.userlocale + '".');

                return userInfo;
            }
        }

        function checkHasRoles(roles) {
            return getUserInfo().then(checkHasAllRoles);

            function checkHasAllRoles(userInfo) {
                var failingRole;

                angular.forEach(roles, function (role) {
                    if (userInfo.roles.indexOf(role) === -1) {
                        failingRole = role;
                    }
                });

                return failingRole ? $q.reject('User has not required role: "' + failingRole + '".') : userInfo;
            }
        }
    });
