/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::LinkingAnswerDirective;
* Description: rappresenta il componente grafico che permette all’utente di 
  visualizzare la domanda di collegamento. Viene visualizzato dinamicamente
  all’interno delle views TrainingView e FillingQuestionnaireView mediante il
  controller QuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LinkingAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('linkingAnswerDirective', linkingAnswerDirective);

function linkingAnswerDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/LinkingAnswerDirective.html'
  };
  return directive;
};
