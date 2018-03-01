'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('usersAdminApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginCtrl.awesomeThings.length).toBe(3);
  });
});
