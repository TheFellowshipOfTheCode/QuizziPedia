/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SortImagesAnswerDirective;
* Description: rappresenta il componente grafico che permette all’utente di
  visualizzare la domanda ad ordinamento di immagini. Viene visualizzato 
  dinamicamente all’interno delle views TrainingView e FillingQuestionnaireView 
  mediante il controllerG QuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SortImagesAnswerDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('sortImagesAnswerDirective', SortImagesAnswerDirective );

function SortImagesAnswerDirective () {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/SortImagesAnswerDirective.html'
  };
  return directive;
};
