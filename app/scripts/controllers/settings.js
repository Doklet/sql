'use strict';


angular.module('sqlApp')
  .controller('SettingsCtrl', function ($scope, $location, Client) {

  	$scope.account = Client.getAccount();

    $scope.done = function() {
    	$location.path('/');
    };

  });
