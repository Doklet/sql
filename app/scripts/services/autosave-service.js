'use strict';


angular.module('sqlApp')
  .service('AutoSaveService', function($http, Client) {

    this.getAutoSave = function(account) {

      var docletId = Client.getDocletId();

      var accountId = '__default';
      if (account !== undefined) {
      	accountId = account.id;
      }

      return $http.get('/api/doclet/' + docletId + '/bucket/autosave/' + accountId);
    };

    this.autoSave = function(account, query) {

      var docletId = Client.getDocletId();

      var accountId = '__default';
      if (account !== undefined) {
      	accountId = account.id;
      }

      var autosave = {
        query: query
      };

      return $http.put('/api/doclet/' + docletId + '/bucket/autosave/' + accountId, autosave);
    };
    
  });
