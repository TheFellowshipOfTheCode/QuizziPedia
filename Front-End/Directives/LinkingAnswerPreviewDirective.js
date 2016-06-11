/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::LinkingAnswerPreviewDirective;
* Description: directive che permette di visualizzare una parte del testo
  di una domanda di collegamento;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LinkingAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('linkingAnswerPreviewDirective', linkingAnswerPreviewDirective);

function linkingAnswerPreviewDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/LinkingAnswerPreviewDirective.html'
  };
  return directive;
};
