/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::TrueFalseAnswerDirective;
* Description: direttiva per la visualizzazione della domanda vero/flase;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: TrueFalseAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('trueFalseAnswerDirective', TrueFalseAnswerDirective);


function TrueFalseAnswerDirective() {
  return {
    restrict: 'E',
    templateUrl: 'Directives/TrueFalseAnswerDirective.html',
    link: trueFalseAnswerDirectiveFunction
  };
};

trueFalseAnswerDirectiveFunction.$inject = ['$scope'];

function trueFalseAnswerDirectiveFunction ($scope) {
  $scope.isActiveTrue = false;
  $scope.isActiveFalse = false;
  $scope.toggleActive = function(check) {
    if(check) {
      $scope.isActiveTrue = true;
      $scope.isActiveFalse = false;
    }
    else {
      $scope.isActiveTrue = false;
      $scope.isActiveFalse = true;
    }
  };
}
