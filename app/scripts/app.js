'use strict';

/**
 * @ngdoc overview
 * @name usersAdminApp
 * @description
 * # usersAdminApp
 *
 * Main module of the application.
 */
angular
  .module('usersAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'socialLogin'
  ])
  .config(function ($routeProvider, $urlRouterProvider, $stateProvider, socialProvider) {
      var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      };

      var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      };

      var profileState = {
        name: 'profile',
        url: '/profile/:id',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      };

      $stateProvider.state(mainState);
      $stateProvider.state(loginState);
      $stateProvider.state(profileState);
      $urlRouterProvider.otherwise('/');

      socialProvider.setGoogleKey("729418284493-jmftrbbe028p37pgmsfvjfpvlm0cnmt6.apps.googleusercontent.com");
  })

  // run blocks
  .run(function($rootScope, mainService, $state) {
    // inject callback login instance 
     $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
        console.log("Register social user");
        userDetails.firstName = userDetails.name;
        userDetails.lastName = userDetails.name;
        userDetails.username = userDetails.email.replace(/[^\w\s!?]/g,'');

        mainService.socialRegister(userDetails)
          .then(function(data) {

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
                  console.log(data);
                  $state.go("^.profile", {id:data.userId});
              });
          });
      });


     $rootScope.$on('event:social-sign-out-success', function(event, logoutStatus){
        console.log("Logout2");
        console.log(logoutStatus);
     }); 
  })

  .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                scope.fileread = {};
                scope.fileread.filename = changeEvent.target.files[0].name;                
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread.file = loadEvent.target.result;
                        scope.fileread.file64 = changeEvent.target.files[0];                     
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);