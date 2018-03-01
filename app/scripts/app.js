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
      }

      var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }

      var profileState = {
        name: 'profile',
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }

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
        /*email: "joelgtsantos@gmail.com"
        idToken:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNzY3MWQ3M2EyNjA1Y2NkNDU0NDEzYzRjOTRlMjViM2Y2NmNkZWEifQ.eyJhenAiOiI3Mjk0MTgyODQ0OTMtam1mdHJiYmUwMjhwMzdwZ21zZnZqZnB2bG0wY25tdDYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3Mjk0MTgyODQ0OTMtam1mdHJiYmUwMjhwMzdwZ21zZnZqZnB2bG0wY25tdDYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEyMjkyNzExMDY1NjkzNzcxMjYiLCJlbWFpbCI6ImpvZWxndHNhbnRvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjdSS2tTTlpUNUpJc0tkVXRObUpJVWciLCJleHAiOjE1MTg1NTE0NzMsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJhYzQzZTkwMTA5NDA5NTIxZGQ0YmVjNjIzYjgzNTFlODdiNTZmMTU5IiwiaWF0IjoxNTE4NTQ3ODczLCJuYW1lIjoiSm9lbCBTYW50b3MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1hT2ZxQldTc1lfby9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBcy9KNXBsMlVwakZ4VS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiSm9lbCIsImZhbWlseV9uYW1lIjoiU2FudG9zIiwibG9jYWxlIjoiZXMifQ.rGSsVlwfjhAQMI33Aza8DAiPPMtYr6uXoa2uc_jopHJcXGfoODV5RKxhDGZiFY7-H7uVP_cbuJPS4z_zG-aevnJN_bkZMqan4MYLFTV46LNLEXrGjNd42zTI6aa3cOiXLLsg4ObE-lODVkBi3NbFyxTdEtqVHfAngy8Y8yHd6XTyihtsQUobdD-IkKmf3hx_blay2g91-Gv0tphcVcNKY3Jv5519wHVKT_Afud2gjc9H4-5IHDaluzgs1D3RZe2ePWh8qPpQ51p5-5fkzu7dwTKloddbzfK5KEOuytWoEIPKFwc64K-tLaja6v7RrJedl0DECEUYmDEuL4hmc0p1yg"
        imageUrl:"https://lh3.googleusercontent.com/-aOfqBWSsY_o/AAAAAAAAAAI/AAAAAAAAAAs/J5pl2UpjFxU/s96-c/photo.jpg"
        name:"Joel Santos"
        provider:"google"
        token:"ya29.GlxhBf1LM_kkQ1vQ7Zh_r8TUtuZTPOz_n7Cr66yzoUQXoH47b0xj7F_f1yj54-Ng0YeJ-dtQa-x72VoHU2rK5hj0idcqNzo3sR5z4lIfFA4E_ylI8CxUsNPFvQpHxQ"
        uid:"101229271106569377126"*/
        
        //console.log(userDetails);
        //var user = {};

        //user.firstName = "";
        //user.lastName = "";
        //user.email = "";
        //user.username = "";
        //user.password = "";

        mainService.socialRegister(userDetails)
          .then(function(data) {
            console.log(data);
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
                  $state.go("^.profile", {idUser:1});
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
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);



