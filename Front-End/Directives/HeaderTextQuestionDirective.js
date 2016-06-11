/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::HeaderTextQuestionDirective;
* Description: rappresenta il componente grafico che presenta all’utente 
  l’argomento e le parole chiave della domanda che ha a schermo. Viene visualizzato
  dinamicamente all’interno delle views TrainingView e FillingQuestionnaireView 
  mediante il controller QuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: HeaderTextQuestionDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('headerTextQuestionDirective', HeaderTextQuestionDirective);

function HeaderTextQuestionDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/HeaderTextQuestionDirective.html'
  };
  return directive;
};
