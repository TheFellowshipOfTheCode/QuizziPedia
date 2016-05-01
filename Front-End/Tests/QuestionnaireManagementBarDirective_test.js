/*******************************************************************************
* Name: QuestionnaireManagementBarDirective_test;
* Description: test di unità per la classe
* QuizziPedia::Front-End::Directives::QuestionnaireManagementBarDirective;
* Creation data: 30-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: QuestionnaireManagementBarDirective_test_20160430;
* Update data: 30-04-2016;
* Description: Scritto il test, superato;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

describe("QuestionnaireManagementBarDirective's Unit test", function () {
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
    var template = $compile("<questionnaire-management-bar-directive></questionnaire-management-bar-directive>")($scope);
    $scope.listOfKeys={"questionnaireManagement": "Gestione questionario"};
    $scope.$digest();
    var result = template.text();
    var check = false;
    var n = result.search($scope.listOfKeys.questionnaireManagement);
    if(n != -1) {
      check = true;
    }
    expect(check).toBe(true);
  }));

});
