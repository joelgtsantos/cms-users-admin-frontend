'use strict';

/**
 * @ngdoc function
 * @name usersAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the usersAdminApp
 */
angular.module('usersAdminApp')
  .controller('LoginCtrl', function ($scope, mainService, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = {};
    $scope.user.file = {};
    $scope.user.file.filename = "Ningun archivo";

    $scope.login = function(){
      console.log("asdfasdjfakls");
      //Login
      mainService.login($scope.user)
        .then(function(data) {
          console.log(data);
          if(data == null || data == ""){
            swal('Atención', 'Correo electronico y contraseña no coinciden!', 'error')
          }else{
            $state.go("^.profile", {idUser:data.idUser});
          }
      });
    }

  });
