angular.module('app')
    .controller('DummyCtrl', function (user) {
        // mock controller to set something in the routes
        console.log('Dummy controller', user);
    })
    .controller('ServerErrorCtrl', function ($http) {
        // mock controller to cause a server error
        $http.get('/non-existing');
    });
