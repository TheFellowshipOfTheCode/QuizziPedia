/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::MultipleChoiceAnswerPreviewDirective;
* Description: directive che permette di visualizzare una parte del testo di
  una domanda a risposta multipla;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MultipleChoiceAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('multipleChoiceAnswerPreviewDirective', multipleChoiceAnswerPreviewDirective);

function multipleChoiceAnswerPreviewDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/MultipleChoiceAnswerPreviewDirective.html',
  };
  return directive;
};
