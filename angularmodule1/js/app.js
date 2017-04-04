'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/login'),
    $urlRouterProvider.when('', '/login'),
    // $urlRouterProvider.otherwise('/login'),

    $stateProvider.state('base', {
        'abstract': !0,
        url: '',
        templateUrl: 'views/base.html'
    })
    .state('list', {
        url: '/list',
        parent: 'base',
        templateUrl: 'views/list.html',
        resolve: { list: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/ListsController.js', 'js/services/lists.js']
          })
        }
      }
    })

    .state('mySuggestions', {
        url: '/mySuggestions',
        parent: 'base',
        templateUrl: 'views/mySuggestions.html',
        resolve: { mySuggestions: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })

    .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        controller: function($scope, $state) {
          if($scope.app.user_details) {
            if($scope.app.user_details.admin) {
              $state.go('dashboard');
            }
            else {
              $state.go('myTransport');
            }
          }
        },
        resolve: { login: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/UsersController.js', 'js/landing.js']
          })
        }
      }
    })

    .state('adminSuggestions', {
        url: '/adminSuggestions',
        parent: 'base',
        templateUrl: 'views/adminSuggestions.html',
        controller: function($scope, $state) {
          if($scope.app.user_details) {
            if($scope.app.user_details.admin) {
            }
            else {
              $state.go('myTransport');
            }
          }
        },
        resolve: { adminSuggestions: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })

    .state('homepage', {
        url: '/homepage',
        parent: 'base',
        resolve: { homepage: function($ocLazyLoad, $state) {
          $state.go('myTransport');
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/UsersController.js']
          })
        }
      }
    })

    .state('viewTransport', {
        url: '/viewTransport',
        parent: 'base',
        templateUrl: 'views/viewTransport.html',
        controller : function($scope, $state) {
          if(!$scope.app.user_details) {
            $state.go('login');
          }
        },
        resolve: { viewTransport: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })


    .state('myTransport', {
        url: '/myTransport',
        parent: 'base',
        templateUrl: 'views/myTransport.html',
        controller : function($scope, $state) {
          if(!$scope.app.user_details) {
            $state.go('login');
          }
          // else if(!$scope.app.user_details.verified) {
          //     alert('Please update your credentials');
          //     $state.go('register');
          //   }

        },
        resolve: { myTransport: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })

    .state('enrollTransport', {
        url: '/enrollTransport',
        parent: 'base',
        templateUrl: 'views/enrollTransport.html',
        controller : function($scope, $state) {
          if(!$scope.app.user_details) {
            $state.go('login');
          }
          else {
            if(!$scope.app.user_details.verified) {
              alert('Update your credentials');
              $state.go('register');
            }

          }
        },
        resolve: { enrollTransport: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })

    .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller : function($scope) {
          if($scope.app.user_details) {
            if(!$scope.app.user_details.admin) {
              $state.go('homepage');
            }
          }
        },
        resolve: { dashboard: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/TransportController.js']
          })
        }
      }
    })
    .state('register', {
        url: '/register',
        parent: 'base',
        templateUrl: 'views/register.html',
        resolve: { register: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/UsersController.js']
          })
        }
      }
    })
}]);
