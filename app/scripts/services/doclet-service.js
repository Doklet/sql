'use strict';


angular.module('sqlApp')
  .service('DocletService', function($http) {

    this.list = function() {
      return $http.get('/api/doclet');
    };

  });
