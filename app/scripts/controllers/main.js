'use strict';


angular.module('sqlApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, AccountService, PipeService) {

    $scope.account = undefined;

    $scope.in = {
      query: undefined
    };

    $scope.out = {
      result: undefined
    };

    if (Client.getAccount() === undefined) {

      var sessionId = $location.search().token;
      if (sessionId !== undefined) {
        Client.setSessionId($window.unescape(sessionId));
      }

      var accountId = $window.unescape($location.search().accountId);

      AccountService.fetchAccount(accountId)
        .success(function(account) {
          Client.setAccount(account);
          $scope.account = account;
        })
        .error(function() {
          $scope.error = 'Failed to fetch account';
        });
    }

    $scope.run = function() {

      var commands = 'sql --account="' + $scope.account.name + '"';

      PipeService.execute(commands, $scope.in.query)
        .success(function(response) {
          $scope.out.result = response;
          $scope.out.processing = false;
        })
        .error(function(response) {
          $scope.out.processing = false;
          $scope.out.result = response;

          $scope.info = undefined;
          $scope.error = 'Failed to execute command';
        });
    };

  });
