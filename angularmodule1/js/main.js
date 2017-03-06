'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$state', '$localStorage', function($scope, $state, $localStorage) {

    $scope.app = {
      name: 'Angular-Starter',
      version: '1.0.0',
      apiURL: 'http://localhost:1337/',
      logout : function() {
        $localStorage.$reset();
        $state.go('login');
      }
    }

}]);
