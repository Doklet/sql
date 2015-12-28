'use strict';


angular.module('sqlApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, AccountService, PipeService, DocletService) {

    $scope.FORMAT = {
      TEXT: 0,
      TABLE: 1
    };

    $scope.account = undefined;

    $scope.in = {
      query: undefined
    };

    $scope.out = {
      processing: false,
      format: $scope.FORMAT.TEXT,
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

      DocletService.list()
        .success(function(doclets) {
          Client.setDoclets(doclets);
          $scope.doclets = Client.getDoclets();
        })
        .error(function() {
          $scope.info = undefined;
          $scope.error = 'Failed to fetch doclets';
        });
    }


    $scope.keys = function(obj) {
      return obj ? Object.keys(obj) : [];
    };

    $scope.isTableOutput = function() {
      // If the output is a array it's valid
      if ($scope.out.result instanceof Array) {
        return true;
      }
      // otherwise it's a not a valid table output
      return false;
    };

    $scope.run = function() {

      $scope.info = undefined;
      $scope.error = undefined;

      $scope.out.processing = true;

      var commands = 'sql --account="' + $scope.account.name + '"';

      PipeService.execute(commands, $scope.in.query)
        .success(function(response) {
          $scope.out.processing = false;
          $scope.out.result = response;
        })
        .error(function(response) {
          $scope.out.processing = false;
          $scope.out.format = $scope.FORMAT.TEXT;
          $scope.out.result = response;

          $scope.info = undefined;
          $scope.error = 'Failed to execute command';
        });
    };

    $scope.saveTo = function(doclet) {

      // Execute the pipe with the provided parameters
      var commands = 'sql --account="' + $scope.account.name + '"';
      commands += ' --query="' + $scope.in.query + '"';
      
      var cmd = 'brick --name=New --cmds="' + $window.btoa(commands) + '" --bricksid=' + doclet.id;

      // Set the type depending on selected output view
      switch ($scope.out.format) {
        case $scope.FORMAT.TABLE:
          cmd += ' --table';
          break;
        default:
          cmd += ' --text';
      }

      PipeService.execute(cmd)
        .success(function() {
          var home = $window.unescape($location.search().home);
          $window.top.location = home + '/' + doclet.id;
        })
        .error(function() {
          $scope.info = undefined;
          $scope.error = 'Failed to save brick';
        });

    };

  });
