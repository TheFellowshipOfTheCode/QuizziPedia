/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::EndTrainingDirective;
* Description: directive che permette all’utente di visualizzare il resoconto
 al termine di un allenamento;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: EndTrainingDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('endTrainingDirective', EndTrainingDirective);

function EndTrainingDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/EndTrainingDirective.html'
  };
  return directive;
};
