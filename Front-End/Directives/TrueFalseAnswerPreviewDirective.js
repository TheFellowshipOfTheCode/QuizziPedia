/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::TrueFalseAnswerPreviewDirective;
* Description: direttiva per la visualizzazione della preview della domanda vero/falso;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: TrueFalseAnswerPreviewDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('trueFalseAnswerPreviewDirective', TrueFalseAnswerPreviewDirective);


function TrueFalseAnswerPreviewDirective() {
  return {
    restrict: 'E',
    templateUrl: 'Directives/TrueFalseAnswerPreviewDirective.html'
  };
};
