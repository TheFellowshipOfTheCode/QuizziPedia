/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::InfoQuestionnaireDirective;
* Description: rappresenta il componente grafico che permette all’utente di
  visualizzare le informazioni principali del questionario che si sta per svolgere.
  Viene visualizzato dinamicamente all’interno della view FillingQuestionnaireView
  mediante il controller FillingQuestionsController;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: InfoQuestionnaireDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('infoQuestionnaireDirective', InfoQuestionnaireDirective);

function InfoQuestionnaireDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/InfoQuestionnaireDirective.html'
  };
  return directive;
};
