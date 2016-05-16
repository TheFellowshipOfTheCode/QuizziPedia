/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SortTextAnswerPreviewDirective;
* Description: directive per la visualiizazione della preview della domanda ad ordinamento testo;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SortTextAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('sortTextAnswerPreviewDirective', SortTextAnswerPreviewDirective);

function SortTextAnswerPreviewDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/SortTextAnswerPreviewDirective.html'
  };
  return directive;
};
