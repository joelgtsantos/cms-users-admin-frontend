'use strict';

/**
 * @ngdoc function
 * @name usersAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the usersAdminApp
 */
angular.module('usersAdminApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = {};
    $scope.user.file = {};
    $scope.user.file.name = "Ningun archivo";

  });
