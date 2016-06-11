/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::EmptySpaceAnswerDirective;
* Description: rappresenta il componente grafico che permette all’utente di visualizzare
 l’esercizio a riempimento di spazi vuoti. Viene visualizzato dinamicamente all’interno delle views
 TrainingView e FillingQuestionnaireView mediante il controller QuestionsController; ;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: EmptySpaceAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('emptySpaceAnswerDirective', EmptySpaceAnswerDirective);

function EmptySpaceAnswerDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/EmptySpaceAnswerDirective.html'
  };
  return directive;
};
