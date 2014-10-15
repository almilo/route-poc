angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/maintenance', {
                template: '<div>Maintenance</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles()
                }
            })
            .when('/error', {
                template: '<div>Error</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles()
                }
            })
            .when('/notices', {
                template: '<div>Notices</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles('user')
                }
            })
            .when('/deliveries', {
                template: '<div>Deliveries</div>',
                controller: 'DummyCtrl',
                label: 'DELIVERIES_TITLE',
                resolve: {
                    user: checkUserRoles('user')
                }
            })
            .when('/transactions', {
                template: '<div>Transactions</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles('user')
                }
            })
            .when('/dashboard', {
                template: '<div>Dashboard</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles('user')
                }
            })
            .when('/account_activity', {
                template: '<div>Account activity</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles(['user', 'admin'])
                }
            })
            .when('/account_activity_details', {
                template: '<div>Account activity details</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles(['user', 'admin'])
                }
            })
            .when('/support', {
                template: '<div>Support</div>',
                controller: 'DummyCtrl',
                resolve: {
                    user: checkUserRoles()
                }
            })
            .when('/manage_users', {
                template: '<div>Manage users</div>',
                controller: 'ServerErrorCtrl',
                resolve: {
                    user: checkUserRoles()
                }
            })
            .otherwise({
                redirectTo: '/dashboard'
            });

        function checkUserRoles(roles) {
            roles = !angular.isArray(roles) ? [roles] : roles;

            return function (UserService) {
                return UserService.checkHasRoles(roles);
            }
        }
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('ServerErrorHttpInterceptorService');
    })
    .run(function ($rootScope, RouteErrorHandlerService, ErrorService) {
        $rootScope.$on('$routeChangeError', RouteErrorHandlerService);

        $rootScope.$on('$routeChangeSuccess', function() {
            ErrorService.setError(undefined);
        });
    });

