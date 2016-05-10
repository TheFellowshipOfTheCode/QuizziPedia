/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::;
* Description: ;
* Relations with other classes:
* +
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: _20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('trueFalseAnswerPreviewDirective', TrueFalseAnswerPreviewDirective);


function TrueFalseAnswerDirective() {
  return {
    restrict: 'E',
    templateUrl: 'Directives/TrueFalseAnswerPreviewDirective.html'
  };
};
