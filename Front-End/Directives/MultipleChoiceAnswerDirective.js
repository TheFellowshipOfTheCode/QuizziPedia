/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::MultipleChoiceAnswerDirective;
* Description: rappresenta il componente grafico che permette all’utente di
  visualizzare la domanda a risposta multipla. Viene visualizzato dinamicamente
  all’interno delle views TrainingView e FillingQuestionnaireView mediante il 
  controller QuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MultipleChoiceAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('multipleChoiceAnswerDirective', multipleChoiceAnswerDirective);

function multipleChoiceAnswerDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/MultipleChoiceAnswerDirective.html',
  };
  return directive;
};
