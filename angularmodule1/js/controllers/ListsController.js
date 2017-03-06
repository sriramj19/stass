'use strict';

var app = angular.module('app');
/* Lists Controller */

app.controller('ListController', ['$scope', '$http', 'ListsService', function($scope, $http, ListsService) {
  $scope.lists = ListsService.getLists();
}]);
