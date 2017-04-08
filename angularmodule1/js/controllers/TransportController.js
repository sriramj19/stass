'use strict';

var app = angular.module('app');

app.controller('TransportController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
  $scope.student = "";
  $scope.suggestionData = [];
  $scope.suggestion = {};
  $scope.toChangeList = [];

  $scope.checkLocal = function() {
    if($localStorage.userDetails) {
      $scope.app.user_details = $localStorage.userDetails;
    } else {
      $scope.app.logout();
    }
  }
  $scope.checkLocal();

  $scope.reload = function() {
    $state.reload();
  }

  $scope.getRoutes = function() {
    $http.get($scope.app.apiURL + 'getAllRoutes').then(function(response) {
      $scope.transportData = response.data;
    }, function(x) {
      console.log(x.data.error);
    });
  }


  $scope.alterTransport = function(id) {

      if($scope.toChangeList.indexOf(id)>-1)
        $scope.toChangeList.splice(($scope.toChangeList.indexOf(id)));
      else {
        $scope.toChangeList.push(id);
      }
  }

  $scope.changeTransport = function(ind, changeNote) {
    var note;
    console.log(changeNote);
    switch (ind) {
      case 0: note = "Postponed by " + changeNote;

        break;
      case 1 : note = "Preponed by " + changeNote;

        break;
      case 2 : note = "Cancelled " + changeNote;

        break;
      default: alert('Something went wrong, try again');
               $state.reload();

    }
    console.log(changeNote);
    if($scope.toChangeList.length) {
      var email = confirm('Do you wish to send an email notification?');
      $http.post($scope.app.apiURL + 'alterTransport', {list : $scope.toChangeList, note : note, email : email}).then(function(response) {
        $state.reload();
      }, function(x) {
        alert(x.data.error);
      });
    }
    else {
      alert('Please select a transport route');
    }
    // $scope.changeNote = "";
  }

  $scope.getSuggestions = function() {
    $http.get($scope.app.apiURL + 'admin/suggestionView').then(function(response) {
      $scope.suggestionData = response.data;
      $scope.suggestionData.reverse();
    }, function(x) {
      console.log(x.data.error);
    });
  }

  $scope.makeNote = function() {
    document.getElementById('note').style.display = "block";
  }

  $scope.sendNote = function(id, route) {
    $http.post($scope.app.apiURL + 'createSuggestion', {id : id, bus_route : route, note : $scope.note}).then(function(response) {
      $state.reload();
    }, function(x) {
      console.log(x.data.error);
    });
  }

  $scope.readAction = function(suggestion) {
    $scope.noteData = "";
    suggestion.readRecipient = true;
    $http.post($scope.app.apiURL + 'readRecipient', {id : suggestion.id, }).then(function(response) {
      $scope.noteData = response.data[0].note;
    }, function(x) {
      console.log(x.data.error);
    });
  }

  $scope.action = function(suggestion) {
    $scope.noteData = "";
    $http.post($scope.app.apiURL + 'noteData', {id : suggestion.id}).then(function(response) {
      $scope.noteData = response.data.note;
    }, function(x) {
      console.log(x.data.error);
    });
  }


  $scope.gotoSuggestions = function() {
    $state.go('adminSuggestions');
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

    $scope. goToYourSuggestions = function() {
      $state.go('mySuggestions');
    }

    $scope.getMySuggestions = function() {
      $http.post($scope.app.apiURL + 'student/suggestionView', {id : $scope.app.user_details.id}).then(function(response) {
        $scope.suggestionData = response.data;
      }, function(x) {
        alert(x.data.error);
        $state.go('myTransport');
      });
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
