/*******************************************************************************
* Name: UserBarDirective_test;
* Description: test di unità per la classe
* QuizziPedia::Front-End::Directives::UserBarDirective;
* Creation data: 30-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: UserBarDirective_test_20160430;
* Update data: 30-04-2016;
* Description: Scritto il test, superato;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

describe("UserBarDirective's Unit test", function () {
  var $compile;
  var $scope;
  var UserDetailsModel;

  beforeEach(function(){
    module("QuizziPedia");
    module('templates');
    inject(function(_$compile_, _$rootScope_,$injector) {
               $compile = _$compile_;
               $scope = _$rootScope_.$new();
               UserDetailsModel = $injector.get('UserDetailsModel');
             });
  });

  it('should create botton with the correct label', inject(function() {
    var template = $compile("<user-bar-directive></user-bar-directive>")($scope);
    $scope.userLogged = new UserDetailsModel("Alberto", "Ferrara", "albertoferrara92@gmail.com", "path", "aferrara", "stats" , "500", "pro", "01");
    $scope.$digest();
    var result = template.text();
    var check = false;
    var n = result.search($scope.userLogged.getName()+" "+$scope.userLogged.getSurname());
    if(n != -1) {
      check = true;
    }
    expect(check).toBe(true);

  }));

});
