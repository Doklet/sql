'use strict';

/**
 * @ngdoc function
 * @name sqlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sqlApp
 */
angular.module('sqlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
