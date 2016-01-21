'use strict';

angular.module('sqlApp')
  .service('Client', function() {

    var _mainScope = { 
      in : {
        query: undefined
      },
      out: {
        processing: false,
        format: 0, // text
        result: undefined
      }
    };

    var _sessionId;
    var _docletId;
    var _account;
    var _doclets;

    this.getSessionId = function() {
      return _sessionId;
    };

    this.setSessionId = function(sessionId) {
      _sessionId = sessionId;
    };

    this.setDocletId = function(docletId) {
      if (docletId !== undefined) {
        _docletId = docletId;
      }
    };

    this.getDocletId = function() {
      return _docletId;
    };

    this.getAccount = function() {
      return _account;
    };

    this.setAccount = function(account) {
      _account = account;
    };

    this.setDoclets = function(doclets) {
      _doclets = doclets;
    };

    this.getDoclets = function() {
      return _doclets;
    };

    this.getMainScope = function() {
      return _mainScope;
    };

  });
