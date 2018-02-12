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
        name: 'hello',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }

      var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
      }

      $stateProvider.state(mainState);
      $stateProvider.state(aboutState);
      $urlRouterProvider.otherwise('/');

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
  });



