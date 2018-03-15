'use strict';

/**
 * @ngdoc service
 * @name usersAdminApp.mainService
 * @description
 * # mainService
 * Service in the usersAdminApp.
 * Basic endpoints these provides the basic operations to control the users
 */
angular.module('usersAdminApp')
  .factory('mainService', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ctxPath = 'http://localhost:8080/app/api/';//window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));


    //Register a new user o modifies the current user
    function registerUser(user) {
		var defer = $q.defer();
		user.timezone= "";
		user.preferredLanguages = "";

	    $http({
	    	method:"POST",
            url: ctxPath + "user",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	 //Register a new user o modifies the current user
    function socialRegister(user) {
		var defer = $q.defer();
		user.timezone= "";
		user.preferredLanguages = "";

	    $http({
	    	method:"POST",
            url: ctxPath + "register",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	//Asignies the user to the current participation
	function addUserParticipation(user) {
		var defer = $q.defer();

	    $http({
	    	method:"POST",
            url: ctxPath + "participation",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	//Updates the profile user infomation
	function addUserExtra(user) {
		var defer = $q.defer();

	    $http({
	    	method:"POST",
            url: ctxPath + "user/extra",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	//Uploads the Resumen of one user
	function uploadFile(user) {
		var defer = $q.defer();
		user.file = user.file.split(',')[1];

	    $http({
	    	method:"PUT",
            url: ctxPath + "user/extra/file",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	//Login
	function login(user) {
		var defer = $q.defer();

	    $http({
	    	method:"POST",
            url: ctxPath + "login",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	// expose a public API
	return {
		socialRegister: socialRegister,
		registerUser: registerUser,
		addUserParticipation: addUserParticipation,
		uploadFile: uploadFile,
		addUserExtra: addUserExtra,
		login: login
	};


  });
