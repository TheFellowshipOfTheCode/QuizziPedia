/*******************************************************************************
* Name: SignUpBarDirective_test;
* Description: test di unità per la classe
* QuizziPedia::Front-End::Directives::SignUpBarDirective;
* Creation data: 30-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LoginBarDirective_test_20160430;
* Update data: 30-04-2016;
* Description: Scritto il test, superato;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

describe("SignUpBarDirective's Unit test", function () {
  var $compile;
  var $scope;

  beforeEach(function(){
    module("QuizziPedia");
    module('templates');
    inject(function(_$compile_, _$rootScope_) {
               $compile = _$compile_;
               $scope = _$rootScope_.$new();
             });
  });

  it('should create botton with the correct label', inject(function() {
    var template = $compile("<sign-up-bar-directive></sign-up-bar-directive>")($scope);
    var contents = template.find('button');
    $scope.listOfKeys={"signUp": "Registrati"};
    $scope.$digest();
    var result = template.text();
    var check = false;
    var n = result.search($scope.listOfKeys.signUp);
    if(n != -1) {
      check = true;
    }
    expect(check).toBe(true);
  }));

});
