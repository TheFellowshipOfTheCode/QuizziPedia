/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SortImagesAnswerPreviewDirective;
* Description: directive che permette di visualizzare una parte del testo di 
  una domanda di ordinamento immagini;;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SortImagesAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('sortImagesAnswerPreviewDirective', SortImagesAnswerPreviewDirective );

function SortImagesAnswerPreviewDirective () {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/SortImagesAnswerPreviewDirective.html'
  };
  return directive;
};
