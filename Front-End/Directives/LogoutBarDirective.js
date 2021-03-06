/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::LogoutBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il logout dal sistema; Permette di effettuare il logout dal sistema;
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LogoutBarDirective_20160427;
* Update data: 27-04-2016;
* Description: Creata la direttiva e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('logoutBarDirective', logoutBarDirective);

function logoutBarDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/LogoutBarDirective.html'
  };
  return directive;
}
