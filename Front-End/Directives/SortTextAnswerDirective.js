/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SortTextAnswerDirective;
* Description: rappresenta il componente grafico che permette all’utente di
  visualizzare la domanda ad ordinamento di stringhe. Viene visualizzato
  dinamicamente all’interno delle views TrainingView e FillingQuestionnaireView
  mediante il controller QuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SortTextAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('sortTextAnswerDirective', SortTextAnswerDirective);

function SortTextAnswerDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/SortTextAnswerDirective.html'
  };
  return directive;
};
