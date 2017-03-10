'use strict';

var app = angular.module('app');

app.controller('TransportController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
  $scope.student = "";
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

  $scope.getStopPoints = function(id) {
    if($scope.student) {
      $http.post($scope.app.apiURL + 'getAllStudentsTravels', {id : id}).then(function(response) {
        $scope.studentData = response.data;
      }, function(x) {
        console.log(x.data.error);
      });
    }
    else {
      $http.post($scope.app.apiURL + 'getAllStopPoints', {id : id}).then(function(response) {
        $scope.stopData = response.data;
      }, function(x) {
        console.log(x.data.error);
      });
    }
  }

  $scope.viewRoutes = function(factor) {
    $scope.student = factor;
    if(factor) {
      $scope.view = "Student List (By Route)"
    }
    else {
      $scope.view = "Board Points (By Route)"
    }
    document.getElementById('transportData').style.display = 'block';
  }

  $scope.checkTransport = function() {
    $http.post($scope.app.apiURL + 'checkIfTransportExists', {id : $scope.app.user_details.id}).then(function(response) {
      $scope.studentTransportData = response.data;
    }, function(x) {
      if(x.data.errorNoData) {
        alert(x.data.errorNoData);
        $state.go('enrollTransport');
      }
      else if(x.data.nullFee) {
        alert(x.data.nullFee);
      }
      else {
        console.log(x.data.error);
      }
    });
  }

  $scope.enrollTransport = function(stop) {
    var flag = confirm('Do you wish to continue?');
    if(flag) {
      $http.post($scope.app.apiURL + 'signupForTransport', {profile_id : $scope.app.user_details.id, bus_details : stop.transport_id, stop_details : stop.id}).then(function(response) {
        alert('payFee');
      }, function(x) {
        console.log(x.data.error);
      });
    }
  }

  $scope.goToViewTransport = function() {
    $state.go('viewTransport');
  }

  $scope.removeTransport = function(id) {
    var flag = confirm('Do you want to cancel the bus?');
    if(flag) {
      $http.post($scope.app.apiURL + 'deactivateBus', {id : id}).then(function(response){
        alert('Transport Cancelled');
        $state.reload();
      }, function(x) {
        console.log(x.data.error);
      });
    }

  }

  $scope.resetTransport = function() {
    $http.get($scope.app.apiURL + 'resetTransport').then(function(response) {
      alert('Transport reset');
      $state.reload();
    }, function(x) {
      console.log(x.data.error);
    });
  }

}]);
