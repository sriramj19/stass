'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/list'),
    $urlRouterProvider.otherwise('/list'),

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
    .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        resolve: { login: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/UsersController.js', 'js/landing.js']
          })
        }
      }
    })
}]);
