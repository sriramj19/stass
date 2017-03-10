'use strict';

var app = angular.module('app');

app.controller('UsersController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
  // $scope.checkLocal = function() {
  //   if($localStorage.userDetails) {
  //     $scope.app.user_details = $localStorage.userDetails;
  //   } else {
  //     $scope.app.logout();
  //   }
  // }
  // $scope.checkLocal();

  $scope.login = function() {
    $http.post($scope.app.apiURL + 'authenticate', {roll_number : $scope.roll_number, password : $scope.password}).then(function(response) {
      $localStorage.userDetails = $scope.app.user_details = response.data;
      if(response.data.verified) {
        if(response.data.admin) {
          $state.go('dashboard');
        } else {
          $state.go('myTransport');
        }
      } else {
        $state.go('register');
      }
    }, function(x) {
      $scope.errorCredentials = x.data.error;
      console.log($scope.errorCredentials);
    });
  }

  $scope.dismissErrorCred = function() {
    delete $scope.errorCredentials;
  }

  $scope.register = function() {
    if($scope.full_name&&$scope.email_id&&$scope.mobile_number&&$scope.password) {
        if($scope.password === $scope.password_confirm) {
          var accountDetails = {
            id : $scope.app.user_details.id,
            full_name : $scope.full_name,
            email_id : $scope.email_id,
            mobile_number : $scope.mobile_number,
            password : $scope.password,
            verified : true
          };
          $http.put($scope.app.apiURL + 'createAccount', accountDetails).then(function(response) {
            $localStorage.userDetails = $scope.app.user_details = response.data;
            $state.go('myTransport');
          }, function(x) {
            console.log(response.data.error);
          });
        }
        else {
          alert('The passwords don\'t seem to match...');
        }
    }
    else {
      alert('Please fill out all the fields correctly');
    }
  }

}]);
