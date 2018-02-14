'use strict';

/**
 * @ngdoc service
 * @name usersAdminApp.mainService
 * @description
 * # mainService
 * Service in the usersAdminApp.
 */
angular.module('usersAdminApp')
  .factory('mainService', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ctxPath = 'http://localhost:8080/app/api/';//window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

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

	function uploadFile(user) {
		var defer = $q.defer();
		user.file = user.file.split(',')[1];

	    $http({
	    	method:"POST",
            url: ctxPath + "user/file",
            data: user,                
            headers: {'Content-Type': 'application/json'}
	    }).then(function(response) {
	    	defer.resolve(response.data);
	    });
	    
	    return defer.promise;
	}

	// expose a public API
	return {
		registerUser: registerUser,
		addUserParticipation: addUserParticipation,
		uploadFile: uploadFile,
		addUserExtra: addUserExtra
	};


  });
