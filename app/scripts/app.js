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
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }

      var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AboutCtrl'
      }

      $stateProvider.state(mainState);
      $stateProvider.state(loginState);
      $urlRouterProvider.otherwise('/main');

      socialProvider.setGoogleKey("729418284493-jmftrbbe028p37pgmsfvjfpvlm0cnmt6.apps.googleusercontent.com");
  })

  // run blocks
  .run(function($rootScope) {
    // inject callback login instance 
     $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
        console.log(userDetails);
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
                scope.fileread.name = changeEvent.target.files[0].name;
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {                        
                        scope.fileread.file = loadEvent.target.result;                        
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);



