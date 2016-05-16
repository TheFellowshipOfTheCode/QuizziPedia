/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::EmptySpaceAnswerPreviewDirective;
* Description: directiveG che permette di visualizzare una parte del testo
  di una domanda di riempimento degli spazi vuoti ;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: EmptySpaceAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('emptySpaceAnswerPreviewDirective', EmptySpaceAnswerPreviewDirective);

function EmptySpaceAnswerPreviewDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/EmptySpaceAnswerPreviewDirective.html'
  };
  return directive;
};
