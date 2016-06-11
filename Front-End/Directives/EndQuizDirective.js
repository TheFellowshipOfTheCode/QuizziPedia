/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::EndQuizDirective;
* Description: directiveG che permette all’utente di visualizzare il resoconto
  al termine della compilazione di un questionario; ;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: EndQuizDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('endQuizDirective', EndQuizDirective);

function EndQuizDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/EndQuizDirective.html'
  };
  return directive;
};
