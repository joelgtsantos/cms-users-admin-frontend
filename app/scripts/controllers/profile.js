'use strict';

/**
 * @ngdoc function
 * @name usersAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the usersAdminApp
 */
angular.module('usersAdminApp')
  .controller('ProfileCtrl', function ($scope, mainService, $stateParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = {};
    $scope.user.file = {};
    $scope.user.file.filename = "Ningun archivo";



    $scope.saveInforUser = function(){
      var user = {};

      user.birthdate = new Date($scope.user.dd + "/" + $scope.user.mm + "/" + $scope.user.yyyy); 
      user.study = $scope.user.study;
      user.work = ($scope.user.work === true? 'S' : 'N');
      user.id = $stateParams.id;
      user.cv = $scope.user.file.file.split(',')[1];//filename
      user.filename = $scope.user.file.filename;
      console.log(user.cv);

      //Extra Info
      mainService.addUserExtra(user)
        .then(function(data) {

        //Update file  
        mainService.uploadFile($scope.user.file)
          .then(function(file) {
            console.log(data);
            $scope.user.file = {};
            $scope.user.file.filename = "Ningun archivo";
            swal('', 'Perfil actualizado!', 'success');
        });    
      });
    };

  });
