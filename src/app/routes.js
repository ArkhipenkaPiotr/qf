routes.$inject = ['$stateProvider','$locationProvider', '$urlRouterProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state({
            name: 'login',
            url: '/login',
            template: '<login>',
        })
        .state({
            name: 'news',
            url: '/news',
            template: '<news>',
        })
        .state({
            name: 'users',
            url: '/users',
            template: '<users>',
        })
        .state({
            name: 'profile',
            url: '/profile/:param',
            template: '<profile>',
        })
        .state({
            name: 'edit',
            url: '/edit/:param',
            template: '<edit>'
        })
        .state({
            name: 'base',
            url: '/'
        });


/*    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
}