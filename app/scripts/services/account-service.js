'use strict';

angular.module('sqlApp')
  .service('AccountService', function ($http) {

  	this.fetchAccount = function(accountId) {
      return $http.get('/api/account/' + accountId);
    };

  });
