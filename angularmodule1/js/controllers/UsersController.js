'use strict';

var app = angular.module('app');

app.controller('UsersController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {

  $scope.login = function() {
    $http.post($scope.app.apiURL + 'authenticate', {roll_number : $scope.roll_number, password : $scope.password}).then(function(response) {
      $localStorage.userDetails = response.data;
      $state.go('list');
    }, function(x) {
      $scope.errorCredentials = x.data.error;
    });
  }

}]);
