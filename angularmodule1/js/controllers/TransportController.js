'use strict';

var app = angular.module('app');

app.controller('TransportController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
  $scope.checkLocal = function() {
    if($localStorage.userDetails) {
      $scope.app.user_details = $localStorage.userDetails;
    } else {
      $scope.app.logout();
    }
  }
  $scope.checkLocal();

  $scope.getRoutes = function() {
    $http.get($scope.app.apiURL + 'getAllRoutes').then(function(response) {
      $scope.transportData = response.data;
    }, function(x) {
      console.log(x.data.error);
    });
  }

  $scope.viewRoutes = function() {
    document.getElementById('transportData').style.display = 'inline';
  }

}]);
