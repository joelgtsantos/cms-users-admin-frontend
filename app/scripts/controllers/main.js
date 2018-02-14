'use strict';

/**
 * @ngdoc function
 * @name usersAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the usersAdminApp
 */
angular.module('usersAdminApp')
  .controller('MainCtrl', function ($scope, mainService, socialLoginService, $window) {
  	$scope.user = {};
  	$scope.alert = {show: false, title: "", message: ""};
  	var messages = {};
  	messages.password = {title: "Alerta!", message: " Las contraseñas no coinciden!"};
  	$scope.form = {show: false};

    console.log($window.localStorage.getItem('_login_provider'));
  	/*
  	*@user
  	*@participation
  	*This method allows register a new user and if the transaction is succesful 
  	*afterwards the users is asignied to one participation 
  	*/
    $scope.registerUser = function(){
    	console.log("Registering user");
    	console.log($scope.user);
    	mainService.registerUser($scope.user)
	        .then(function(data) {
	        	console.log(data);
	        	$scope.user = data;
				var participation = {};
				participation.ip = null;
				participation.startingTime = 0;
				participation.delayTime = "00:00:00";
				participation.extraTime = "00:00:00";
				participation.password = "";
				participation.hidden = false;
				participation.unrestricted = false;
				participation.contestId = 2;
				participation.userId = data.id;
				participation.teamId = null;
	        	mainService.addUserParticipation(participation)
		        .then(function(data) {
		        	swal('Felicidades', 'Registro completo!', 'success')
		        	$scope.user = '';
		        });
	        });
    }

    //Shows an alert message at the form
    $scope.showAlert = function(message){
    	$scope.alert = message;
    	$scope.alert.show = true;
    }

    //Hides an alert message at the form
    $scope.hideAlert = function(message){
    	$scope.alert.show = false;
    }

    //Verifies if the password and the reentered password matches
    $scope.verifyPassword = function(){
    	if ($scope.user.password != $scope.user.password2){
    		$scope.showAlert(messages.password);
    	}else{
    		$scope.hideAlert();
    	}
    }

    //Shows an alert message at the form
    $scope.showForm = function(){
    	if($scope.form.show)
    		$scope.form.show = false;
    	else
    		$scope.form.show = true;
    }

      //Shows an alert message at the form
    $scope.logoutGoogle = function(){
      console.log("logout");
      socialLoginService.logout();
    }

   

  });
